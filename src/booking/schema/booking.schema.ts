import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/user.schema';
import { Property } from 'src/property/schema/property.schema';

export type BookingDocument = Booking & Document;

@Schema()
export class Booking {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Property' })
  property: Property;
  @Prop({ type: Date, required: true })
  checkInDate: Date;
  @Prop({ type: Date, required: true })
  checkOutDate: Date;
  @Prop({ type: Number, required: true })
  amountPaid: number;
  @Prop({ type: Number, required: true })
  daysOStay: number;
  @Prop({
    type: {
      id: { type: String, required: true },
      status: { type: String, required: true },
    },
  })
  paymentInfo: {
    id: string;
    status: string;
  };
  @Prop({ type: Date, required: true })
  paidAt: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
