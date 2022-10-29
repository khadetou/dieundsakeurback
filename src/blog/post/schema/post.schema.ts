import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/user.schema';
import { Category } from 'src/blog/category/schema/category-schema';
import { Media } from 'src/blog/media/schema/media.schema';
export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: {},
  })
  content: {};

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  categories: Category[];

  @Prop({
    type: Boolean,
    default: true,
  })
  published: boolean;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  postedBy: User;

  // @Prop({
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Media',
  // })
  // featuredImage: Media;

  @Prop({
    type: String,
    unique: true,
    lowercase: true,
  })
  slug: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt?: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
