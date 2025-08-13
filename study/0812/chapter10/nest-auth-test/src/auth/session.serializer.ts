import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { userInfo } from 'os';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }

  serializeUser(user: any, done: Function) {
    done(null, user.id);
  }

  async deserializeUser(
    payload: any,
    done: (err: Error | null, payload: any) => void,
  ): Promise<any> {
    const user = await this.userService.getUser(payload);
    //유저정보가 없는 경우 done() 함수에 에러 전달
    if (!user) {
      done(new Error('User not found'), null);
      return;
    }
    const { password, ...userInfo } = user;

    done(null, userInfo);
  }
}
