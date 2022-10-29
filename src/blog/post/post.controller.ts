import { Controller, Get, Param } from '@nestjs/common';
import { PostService } from './post.service';
import { Post } from './schema/post.schema';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/:slug')
  async getPostbyCategory(@Param('slug') slug: string): Promise<Post> {
    return this.postService.postByCategory(slug);
  }
}
