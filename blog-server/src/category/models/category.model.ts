import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type CategoryDocument=HydratedDocument<Category>

@Schema({
    id:false,
    toJSON:{
        virtuals:true,
        transform:function (doc:any,ret:any){
            delete ret.__v;
            return ret;
        }
    }
})
export class Category {
    _id?:mongoose.Types.ObjectId;
    @Prop()
    title:string;
    @Prop()
    desc:string;
}

export const CategorySchema=SchemaFactory.createForClass(Category);