import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { WeatherService } from '../services/weather.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { CityQueryDto } from '../dto/city-query.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @UseInterceptors(CacheInterceptor) 
  async findCurrentWeather(@Query() cityQueryDto: CityQueryDto) {
    return await this.weatherService.getWeather(cityQueryDto);
  }

  @Get('autocomplete')
  @UseInterceptors(CacheInterceptor)
  async findCityAutocomplete(@Query() cityQueryDto: CityQueryDto) {
    return await this.weatherService.getAutocomplete(cityQueryDto);
  }

  @Get('forecast')
  @UseInterceptors(CacheInterceptor)
  async findForecastWeather(@Query() cityQueryDto: CityQueryDto) {
    return await this.weatherService.getForecast(cityQueryDto);
  }
}
