import {
  Controller,
  Param,
  Body,
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  getAllPosts() {
    console.log('모든 게시글 가져오기');
    return this.blogService.getAllPosts();
  }

  // These methods should be inside the class
  @Post()
  createPost(@Body() postDto) {
    console.log('게시글 작성');
    this.blogService.createPost(postDto);
    return 'success';
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    console.log(`[id: ${id}] 게시글 가져오기`);
    const post = await this.blogService.getPost(id);
    console.log(post);
    return post;
  }

  @Delete(':id') // Remove the leading slash
  deletePost(@Param('id') id: string) {
    console.log(`[id: ${id}] 게시글 삭제`);
    this.blogService.delete(id);
    return 'success';
  }

  @Put(':id')
  updatePost(@Param('id') id: string, @Body() postDto) {
    console.log(`[id: ${id}] 게시글 수정`);
    return this.blogService.updatePost(id, postDto);
  }
}
