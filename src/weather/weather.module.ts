import { Module } from '@nestjs/common';
import { WeatherService } from './services/weather.service';
import { WeatherController } from './controllers/weather.controller';
import { WeatherApiProvider } from './providers/weather-api.provider';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
  ],
  providers: [WeatherService, WeatherApiProvider],
  controllers: [WeatherController],
})
export class WeatherModule { }
