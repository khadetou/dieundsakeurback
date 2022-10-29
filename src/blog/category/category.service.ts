import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schema/category-schema';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import slugify from 'slugify';
import { UpdateCategoryDto } from './dto/update-category';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  //   CREATE CATEGORY
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { name } = createCategoryDto;
    const category = new this.categoryModel({
      name,
      slug: slugify(name),
    });
    try {
      return await category.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // GET ONE CATEGORY
  async findOne(slug: any): Promise<any> {
    return this.categoryModel.findOne(slug);
  }

  //   GET CATEGORIES
  async getAllCategories(): Promise<Category[]> {
    try {
      return this.categoryModel.find({}).sort({ createdAt: -1 });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  //   UPDATE CATEGORY
  async updateCategory(
    updateCategory: UpdateCategoryDto,
    slug: string,
  ): Promise<Category> {
    const { name } = updateCategory;
    try {
      return await this.categoryModel.findOneAndUpdate(
        {
          slug,
        },
        { name, slug: slugify(name) },
        { new: true },
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  //   REMOVE CATEGORY
  async removeCategory(slug: string): Promise<Category> {
    try {
      return await this.categoryModel.findOneAndDelete({ slug });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
