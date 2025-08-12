import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto): Promise<User> {
    // CreateUserDto를 User 엔티티로 변환하고 저장
    return this.userRepository.save(createUserDto);
  }
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  createUser(user: Partial<User>): Promise<User> {
    return this.userRepository.save(user);
  }

  async getUser(email: string): Promise<User | null> {
    const result = await this.userRepository.findOne({ where: { email } });
    return result;
  }

  async updateUser(email: string, _user: Partial<User>) {
    const user: User | null = await this.getUser(email);

    // 사용자를 찾지 못한 경우 에러 처리
    if (!user) {
      throw new Error(`이메일 ${email}로 사용자를 찾을 수 없습니다.`);
    }

    console.log(_user);

    // 값이 제공된 경우에만 업데이트
    if (_user.username !== undefined) {
      user.username = _user.username;
    }
    if (_user.password !== undefined) {
      user.password = _user.password;
    }

    console.log(user);

    // merge가 아닌 save를 사용해서 변경사항을 실제로 저장
    return await this.userRepository.save(user);
  }

  deleteUser(email: string) {
    return this.userRepository.delete({ email });
  }
}
