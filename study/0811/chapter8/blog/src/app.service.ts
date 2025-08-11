import { Injectable } from '@nestjs/common';
import { BlogRepository } from './blog.repository';

@Injectable()
export class AppService {
  constructor(private readonly blogRepository: BlogRepository) {}

  getHello(): string {
    return 'Hello World!';
  }
}
