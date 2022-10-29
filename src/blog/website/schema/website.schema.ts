import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Media } from 'src/blog/media/schema/media.schema';
export type WebsiteDocument = Website & Document;

@Schema()
export class Website {
  @Prop({
    type: String,
    lowercase: true,
    required: true,
  })
  page: string;

  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
  })
  subtitle: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',
  })
  fullWidthImage: Media;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt?: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Website);
