import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/jwt-strategy';
import { User, UserSchema } from 'src/auth/schema/user.schema';
import { MailModule } from 'src/mail/mail.module';
import { CategoryModule } from '../category/category.module';
import { CategoryService } from '../category/category.service';
import { Category, CategorySchema } from '../category/schema/category-schema';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post, PostSchema } from './schema/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    AuthModule,
    CategoryModule,
    AuthModule,
    JwtModule,
    MailModule,
    ConfigModule,
  ],
  controllers: [PostController],
  providers: [PostService, CategoryService, AuthService, JwtStrategy],
})
export class PostModule {}
