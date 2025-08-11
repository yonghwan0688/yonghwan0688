import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('weather')
export class WeatherController {
  constructor(private configService: ConfigService) {}

  @Get()
  public getWeather(): string {
    const apiUrl = this.configService.get<string>('WEATHER_API_URL');
    const apiKey = this.configService.get<string>('WEATHER_API_KEY');
    return this.callWeatherApi(apiUrl, apiKey);
  }

  private callWeatherApi(url: string, key: string): string {
    // Simulate an API call
    console.log('날씨정보 가져오는 중');
    console.log(apiUrl);
    console.log(apiKey);
    return `내일은 맑음`;
  }
}
