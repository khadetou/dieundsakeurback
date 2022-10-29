import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/user.schema';
import { Post } from 'src/blog/post/schema/post.schema';
export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({
    type: String,
    required: true,
    max: 20000,
  })
  content: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    lowercase: true,
  })
  postedBy: User;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  })
  postId: Post;
  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt?: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Comment);
