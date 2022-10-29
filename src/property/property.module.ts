import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertySchema } from './schema/property.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    CloudinaryModule,
    MongooseModule.forFeature([
      { name: Property.name, schema: PropertySchema },
    ]),
    AuthModule,
  ],
  providers: [PropertyService],
  controllers: [PropertyController],
})
export class PropertyModule {}
