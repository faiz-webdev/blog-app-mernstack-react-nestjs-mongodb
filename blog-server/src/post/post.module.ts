import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './models/post.model';
import { CategoryModule } from 'src/category/category.module';
import { TagModule } from 'src/tag/tag.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Post.name,schema:PostSchema}]),CategoryModule,TagModule
  ],
  controllers: [PostController],
  providers: [PostService],
  exports:[PostService],
})
export class PostModule {}
