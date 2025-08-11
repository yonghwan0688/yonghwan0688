import { Controller, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import config from './configs/config';

console.log('env : ' + process.env.NODE_ENV);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`,
      load: [() => config],
    }),
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  cache: true,
})

@Controller()
exprot class AppController{
  @Get('server-url')
  getServerUrl(): string {
    return this.configService.get('SERVER_URL');
  }
}


export class AppModule {}
