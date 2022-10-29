import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

export type AgentDocument = Agent & Document;

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
    },
    default: {},
  })
  image?: {
    public_id: string;
    url: string;
    format: string;
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
  resetPasswordToken?: string;
  @Prop({ type: Date })
  resetPasswordExpiration?: Date;
}

export const Agentchema = SchemaFactory.createForClass(Agent);
