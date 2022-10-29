import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking, BookingDocument } from './schema/booking.schema';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name)
    private readonly bookingModel: Model<BookingDocument>,
  ) {}

  //CREATE PRODUCT
  async createProperty(
    createBookingDto: CreateBookingDto,
    user: any,
  ): Promise<Booking> {
    const {
      amountPaid,
      chekInDate,
      chekOutDate,
      daysOfStay,
      paidAt,
      paymentInfo,
      property,
    } = createBookingDto;

    const bookingField = {
      user: user._id,
      amountPaid: amountPaid && amountPaid,
      checkInDate: chekInDate && chekInDate,
      checkOutDate: chekOutDate && chekOutDate,
      daysOStay: daysOfStay && daysOfStay,
      paidAt: paidAt && paidAt,
      paymentInfo: paymentInfo && paymentInfo,
      property: property && property,
    };

    let booking = new this.bookingModel(bookingField);

    try {
      return await booking.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
