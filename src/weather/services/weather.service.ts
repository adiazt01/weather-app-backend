import { Injectable, Logger } from '@nestjs/common';
import { WeatherApiProvider } from '../providers/weather-api.provider';
import { WeatherCurrent } from '../interfaces/weather/weather-current.interface';
import { CityQueryDto } from '../dto/city-query.dto';
import { WeatherForecast } from '../interfaces/weather/weather-forecast.interface';
import { CityAutocomplete } from '../interfaces/weather/city-autocomplete.interface';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);

  constructor(private readonly weatherApiProvider: WeatherApiProvider) {}

  async getWeather(cityQueryDto: CityQueryDto): Promise<WeatherCurrent> {
    const { city } = cityQueryDto;
    try {
      return await this.weatherApiProvider.getCurrentWeather(city);
    } catch (error) {
      this.logger.error(`Error fetching weather for city: ${city}`, error.stack);
      throw new Error(`Failed to fetch weather for city "${city}": ${error}`);
    }
  }

  async getAutocomplete(cityQueryDto: CityQueryDto): Promise<CityAutocomplete> {
    const { city } = cityQueryDto;
    try {
      return await this.weatherApiProvider.getAutocompleteWeather(city);
    } catch (error) {
      this.logger.error(`Error fetching autocomplete data for city: ${city}`, error.stack);
      throw new Error(`Failed to fetch autocomplete data for city "${city}": ${error}`);
    }
  }

  async getForecast(cityQueryDto: CityQueryDto): Promise<WeatherForecast> {
    const { city } = cityQueryDto;
    try {
      return await this.weatherApiProvider.getForecastWeather(city);
    } catch (error) {
      this.logger.error(`Error fetching forecast for city: ${city}`, error.stack);
      throw new Error(`Failed to fetch forecast for city "${city}": ${error}`);
    }
  }
}
