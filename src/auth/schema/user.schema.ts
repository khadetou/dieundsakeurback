import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, type: String })
  firstname: string;
  @Prop({ required: true, type: String })
  lastname: string;
  @Prop({ type: String, required: true, unique: true })
  email: string;
  @Prop({ required: true, type: String })
  phone: String;
  @Prop({ required: true, type: String })
  password: string;
  @Prop({ type: String, default: '' })
  address: string;
  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  })
  agents?: string[];
  @Prop({
    type: String,
    enum: ['admin', 'user', 'agency', 'owner'],
    default: 'user',
  })
  roles: string;
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
  @Prop({ type: String })
  resetPasswordToken?: string;
  @Prop({ type: Date })
  resetPasswordExpiration?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
