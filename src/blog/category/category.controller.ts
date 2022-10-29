import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category';
import { Category } from './schema/category-schema';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // CREATE CATEGORY
  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  //GET CATEGORIES
  @Get()
  async getAllCategories(): Promise<Category[]> {
    return await this.categoryService.getAllCategories();
  }

  @Put('/:slug')
  async updateCategory(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('slug') slug: string,
  ): Promise<Category> {
    return await this.categoryService.updateCategory(updateCategoryDto, slug);
  }

  @Delete('/:slug')
  async removeUpdateCategory(@Param('slug') slug: string): Promise<Category> {
    return await this.categoryService.removeCategory(slug);
  }
}
