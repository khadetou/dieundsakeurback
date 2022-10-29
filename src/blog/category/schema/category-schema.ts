import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

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

export const CategorySchema = SchemaFactory.createForClass(Category);
