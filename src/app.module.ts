import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ProductModule } from './product/product.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { OrderModule } from './order/order.module';
import { CategoryModule } from './blog/category/category.module';
import { PostModule } from './blog/post/post.module';
import { PropertyModule } from './property/property.module';
import { AgentModule } from './agent/agent.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`, '.env'],
      validationSchema: configValidationSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
    }),
    AuthModule,
    MailModule,
    CategoryModule,
    PostModule,
    PropertyModule,
    AgentModule,
    BookingModule,
    // ProductModule,
    // CloudinaryModule,
    // OrderModule,
  ],
})
export class AppModule {}
