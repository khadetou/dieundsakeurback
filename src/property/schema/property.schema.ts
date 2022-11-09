import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

export type ReviewsDocument = Reviews & Document;
export type PropertyDocument = Property & Document;

@Schema()
export class Reviews {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user?: User;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: Number, required: true })
  rating: number;
  @Prop({ type: String, required: true })
  comment: string;
  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;
}

@Schema()
export class Property {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  address: string;
  @Prop({ type: String, required: true })
  region: string;

  @Prop({ type: String, required: true })
  location: string;

  @Prop({
    type: [
      {
        public_id: { type: String },
        url: { type: String },
        format: { type: String },
        width: { type: Number },
        height: { type: Number },
      },
    ],
  })
  images: {
    public_id: string;
    url: string;
    format: string;
    width: number;
    height: number;
  }[];

  @Prop({ type: String })
  video: string;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({
    type: String,
    enum: ['SELL', 'RENT'],
    default: 'RENT',
  })
  status: string;

  @Prop({ type: Number, required: true, default: 0 })
  price: number;

  @Prop({ type: Number, required: true, default: 0 })
  rooms: number;

  @Prop({ type: Number, required: true, default: 0 })
  beds: number;

  @Prop({ type: Number, required: true, default: 0 })
  baths: number;

  @Prop({ type: Boolean, default: false })
  emergencyexit: boolean;
  @Prop({ type: Boolean, default: false })
  cctv: boolean;
  @Prop({ type: Boolean, default: false })
  internet: boolean;
  @Prop({ type: Boolean, default: false })
  parking: boolean;
  @Prop({ type: Boolean, default: false })
  airconditioning: boolean;
  @Prop({ type: Boolean, default: false })
  securityguard: boolean;
  @Prop({ type: Boolean, default: false })
  terrace: boolean;
  @Prop({ type: Boolean, default: false })
  laundry: boolean;
  @Prop({ type: Boolean, default: false })
  elevator: boolean;
  @Prop({ type: Boolean, default: false })
  balcony: boolean;
  @Prop({ type: Boolean, default: false })
  pool: boolean;

  @Prop({ type: String, required: true })
  area: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop([Reviews])
  reviews: Reviews[];

  @Prop({ type: Number, required: true, default: 0 })
  rating: number;

  @Prop({ type: Number, required: true, default: 0 })
  numbReviews: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
