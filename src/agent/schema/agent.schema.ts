import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

export type AgentDocument = Agent & Document;
export type ReviewsDocument = Reviews & Document;

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
export class Agent {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: User;
  @Prop({ required: true, type: String })
  firstname: string;
  @Prop({ required: true, type: String })
  lastname: string;
  @Prop({ type: String, required: true, unique: true })
  email: string;
  @Prop({ required: true, type: String })
  phone: String;
  @Prop({
    type: String,
    enum: ['MALE', 'FEMALE'],
    default: '',
  })
  gender: string;
  @Prop({ required: true, type: String })
  description: String;
  @Prop({
    type: {
      public_id: { type: String },
      url: { type: String },
      format: { type: String },
      width: { type: Number },
      height: { type: Number },
    },
    default: {},
  })
  image?: {
    public_id: string;
    url: string;
    format: string;
    width: number;
    height: number;
  };
  @Prop(
    raw({
      youtube: String,
      facebook: String,
      linkedin: String,
      instagram: String,
      website: String,
    }),
  )
  socials: Record<string, any>;
  @Prop({ type: String })
  @Prop([Reviews])
  reviews: Reviews[];

  @Prop({ type: Number, required: true, default: 0 })
  rating: number;

  @Prop({ type: Number, required: true, default: 0 })
  numbReviews: number;

  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;
}

export const Agentchema = SchemaFactory.createForClass(Agent);
