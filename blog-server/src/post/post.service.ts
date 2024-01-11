import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './models/post.model';
import { Model } from 'mongoose';
import { User } from 'src/user/models/user.model';
import { CategoryService } from 'src/category/category.service';
import { TagService } from 'src/tag/tag.service';
import { ObjectId } from 'mongodb';
import { PostApproveDto } from './dto/post-approve.dto';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import ApiFeatures from './utility/apiFeatures';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService,
  ) {}

  async create(createPostDto: CreatePostDto, currentUser: User): Promise<Post> {
    const category = await this.categoryService.findOne(
      new ObjectId(createPostDto.category),
    );

    const tags: string[] = [];
    if (createPostDto.tags.length) {
      for (let t: number = 0; t < createPostDto.tags.length; t++) {
        let tag = await this.tagService.findOne(
          new ObjectId(createPostDto.tags[t]),
        );
        tags.push(tag._id.toString());
      }
    }

    const post = new this.postModel(createPostDto);
    post.author = currentUser._id.toString();
    post.category = category._id.toString();
    post.tags = tags;
    return await this.postModel.create(post);
  }

  async findAll(
    query: any,
  ): Promise<{ filteredPostCount: number; posts: Post[]; limit: number }> {
    let limit: number;
    query.limit ? (limit = query.limit) : (limit = 4);

    const filteredPost = new ApiFeatures(this.postModel.find(), query)
      .search()
      .approved(true)
      .sortByNewest()
      .filter();
    const filteredPostCount1 = await filteredPost.query;
    const filteredPostCount = filteredPostCount1.length;
    const apiFeatures = new ApiFeatures(this.postModel.find(), query)
      .search()
      .approved(true)
      .sortByNewest()
      .filter()
      .pagination(limit);

    const posts = await apiFeatures.query
      .populate('author', '_id name avatar')
      .populate('category', '_id title')
      .populate({ path: 'tags', model: 'Tag', select: '_id title' });

    return { filteredPostCount, posts, limit };
  }

  async findOne(id: ObjectId): Promise<Post> {
    const post = await this.postModel
      .findOne({ _id: id, approved: true })
      .populate('author', '_id name avatar')
      .populate('category', '_id title')
      .populate({ path: 'tags', model: 'Tag', select: '_id title' })
      .exec();
    if (!post) throw new NotFoundException('Post not found.');
    return post;
  }

  async approve(postApproveDto: PostApproveDto): Promise<any> {
    const ids: ObjectId[] = postApproveDto.ids.map((id) => new ObjectId(id));
    const approve = await this.postModel.updateMany(
      { _id: { $in: ids } },
      { $set: { approved: postApproveDto.approve } },
      { multi: true },
    );
    return approve;
  }

  async getAllPostByAdmin() {
    return await this.postModel
      .find()
      .select('_id title images approved createdAt')
      .populate('author', '_id name avatar');
  }

  async likes(postId: ObjectId, currentUser: User): Promise<string[]> {
    let post = await this.postModel
      .findOne({ _id: postId, approved: true })
      .exec();
    if (!post) throw new NotFoundException('Post not found.');
    if (!post.likes.includes(currentUser._id.toString())) {
      post.likes.push(currentUser._id.toString());
    } else {
      post.likes = post.likes.filter(
        (l) => l.toString() !== currentUser._id.toString(),
      );
    }
    await post.save({ validateBeforeSave: false });
    return post.likes;
  }

  async findOneAndChangeCommentCount(
    id: ObjectId,
    comment: boolean,
  ): Promise<Post> {
    const post = await this.postModel.findById(id);
    if (!post) throw new NotFoundException('Post Not Found');
    if (comment === true) {
      post.totalComments = post.totalComments + 1;
    } else {
      post.totalComments = post.totalComments - 1;
    }
    return await post.save();
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
