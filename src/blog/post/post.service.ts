import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schema/post.schema';
import { Category, CategoryDocument } from '../category/schema/category-schema';
import { Model } from 'mongoose';
import { CategoryService } from '../category/category.service';
import { v2 } from 'cloudinary';
import slugify from 'slugify';
import { createPostDto } from './dto/create-post.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
    private readonly categoryService: CategoryService,
    private readonly authService: AuthService,
  ) {}

  //   UPLOAD IMAGE
  async uploadImage(image: string): Promise<any> {
    try {
      return await v2.uploader.upload(image, {
        folder: `DieundSakeur/Blog/Post`,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // CREATE POST
  async createPost(createPostDto: createPostDto, user: any): Promise<any> {
    const { title, categories, content } = createPostDto;

    const exist = await this.postModel.findOne({
      slug: slugify(title.toLowerCase()),
    });

    if (exist) return new InternalServerErrorException('Title is taken');
    let ids = [];
    for (let i = 0; i < categories.length; i++) {
      const category = await this.categoryService.findOne({
        name: categories[i],
      });
      if (!category) {
        throw new NotFoundException('This category was not found!');
      } else {
        ids.push(category._id);
      }
    }

    setTimeout(async () => {
      try {
        const post = await new this.postModel({
          slug: slugify(title),
          categories: ids,
          postedBy: user._id,
        }).save();
        await this.authService.findUserAndUpdate(user._id, post);
        return post;
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    }, 1000);
  }

  // POST BY CATEGORY
  async postByCategory(slug: string): Promise<any> {
    try {
      const category = await this.categoryService.findOne({ slug });
      return await this.postModel
        .find({ categories: category._id })
        .populate('featuredImage postedBy')
        .limit(20);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
