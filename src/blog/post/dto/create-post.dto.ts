import { IsNotEmpty, IsString } from 'class-validator';
import { Category } from 'src/blog/category/schema/category-schema';

export class createPostDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  content: string;
  @IsNotEmpty()
  @IsString()
  categories: string[];
  @IsNotEmpty()
  @IsString()
  featuredMedia: string;
}
