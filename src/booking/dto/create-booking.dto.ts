import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

interface PaymentInfo {
  id: string;
  status: string;
}

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  property: any;

  @IsDate()
  @IsNotEmpty()
  chekInDate: Date;

  @IsDate()
  @IsNotEmpty()
  chekOutDate: Date;

  @IsNumber()
  @IsNotEmpty()
  amountPaid: number;

  @IsNotEmpty()
  paymentInfo: PaymentInfo;

  @IsNumber()
  @IsNotEmpty()
  daysOfStay: number;

  @IsDate()
  @IsNotEmpty()
  paidAt: Date;
}
