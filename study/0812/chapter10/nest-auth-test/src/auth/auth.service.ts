import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getUser(email);
    if (!user) {
      return null;
    }
    const { password: hashedPassword, ...userInfo } = user;
    if (!bcrypt.compareSync(password, hashedPassword)) {
      return userInfo;
    }
    return null;
  }

  async register(userDto: CreateUserDto) {
    const user = await this.userService.getUser(userDto.email);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const encryptedPassword = bcrypt.hashSync(userDto.password, 10);

    try {
      const user = await this.userService.createUser({
        ...userDto,
        password: encryptedPassword,
      });
      // 응답에서 비밀번호 필드 제거
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      throw new HttpException('Error', 500);
    }
  }
}
