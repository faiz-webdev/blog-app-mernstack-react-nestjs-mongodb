import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty({message:"post id should not be empty."})
    @IsString({message:"Post Id should be string."})
    postId:string;

    @IsNotEmpty({message:"Comment should not be empty."})
    @IsString({message:"Comment should be string."})
    commentText:string;
}
