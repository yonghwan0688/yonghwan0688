import { readFile, writeFile } from 'fs/promises';
import { PostDto } from './blog.model';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';
import { InjectModel } from '@nestjs/mongoose';
import { create } from 'domain';

@Injectable()
export class BlogRepository implements BlogRepository {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async getAllPosts(): Promise<PostDto[]> {
    const createdPost = {
      ...postDto,
      createdDt: new Date(),
      updatedDt: new Date(),
    };
    this.blogModel.create(createdPost);
  }

  async createPost(post: PostDto): Promise<PostDto> {
    const createdPost = {
      ...post,
      createdDt: new Date(),
      updatedDt: new Date(),
    };
    await this.blogModel.create(createdPost);
    return createdPost;
  }

  async getPost(id: string): Promise<PostDto> {
    return await this.blogModel.findById(id);
  }

  async deletePost(id: string) {
    await this.blogModel.findByIdAndDelete(id);
  }

  async updatePost(id: string, post: PostDto): Promise<PostDto | null> {
    const updatedPost = await this.blogModel
      .findByIdAndUpdate(id, post, { new: true })
      .exec();
    await this.blogModel.findByIdAndUpdate(id, updatedPost);
  }
}
