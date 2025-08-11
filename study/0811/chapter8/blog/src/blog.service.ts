import { PostDto } from './blog.model';
import { Injectible } from '@nestjs/common';

// 리포지토리 클래스와 인터페이스를 가져옵니다.
import { BlogFileRepository, BlogRepository } from './blog.repository';

@Injectable()
export class BlogService {
  blogRepository: BlogRepository;

  constructor(private blogRepository: BlogRepository) {
    // 리포지토리 인스턴스를 주입합니다.
    this.blogRepository = blogRepository;
  }

  async getAllPosts() {
    return await this.blogRepository.getAllPosts();
  }

  createPost(postDto: PostDto) {
    return this.blogRepository.createPost(postDto);
  }

  async getPost(id): Promise<PostDto> {
    return await this.blogRepository.getPostById(id);
  }

  delete(id) {
    return this.blogRepository.deletePost(id);
  }

  updatePost(id, postDto: PostDto) {
    this.blogRepository.updatePost(id, postDto);
  }
}
