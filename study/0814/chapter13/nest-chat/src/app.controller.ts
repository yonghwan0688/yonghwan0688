import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api') // api 경로로 변경
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
