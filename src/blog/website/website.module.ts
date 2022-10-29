import { Module } from '@nestjs/common';
import { WebsiteService } from './website.service';
import { WebsiteController } from './website.controller';

@Module({
  providers: [WebsiteService],
  controllers: [WebsiteController]
})
export class WebsiteModule {}
