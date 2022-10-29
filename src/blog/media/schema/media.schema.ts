import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/user.schema';
export type MediaDocument = Media & Document;

@Schema()
export class Media {
  @Prop({
    type: String,
  })
  url: string;

  @Prop({
    type: String,
  })
  public_id: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  postedBy: User;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt?: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Media);
