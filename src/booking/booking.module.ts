import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking, BookingSchema } from './schema/booking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Booking.name,
        schema: BookingSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
