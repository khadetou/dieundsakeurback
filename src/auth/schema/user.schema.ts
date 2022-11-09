import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
  agencename: string;
  @Prop({ type: String })
  description: string;
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
      width: { type: Number },
      height: { type: Number },
    },
    default: {},
  })
  image: {
    public_id: string;
    url: string;
    format: string;
    width: number;
    height: number;
  };

  @Prop({ type: String })
  resetPasswordToken?: string;
  @Prop({ type: Date })
  resetPasswordExpiration?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
