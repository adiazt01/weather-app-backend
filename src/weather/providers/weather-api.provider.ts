import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IWeatherApiProvider } from '../interfaces/weather-api/weather-api-provider.interface';
import { IGetCurrentWeatherResponse } from '../interfaces/weather-api/current/weather-api-response.interface';
import { lastValueFrom, map } from 'rxjs';
import { WeatherMapper } from '../mappers/weather.mapper';
import { IAutocompleteCityResponse } from '../interfaces/weather-api/autocomplete/weather-api-autocomplete.interface';
import { WeatherCurrent } from '../interfaces/weather/weather-current.interface';
import { CityAutocomplete } from '../interfaces/weather/city-autocomplete.interface';
import { WeatherForecast } from '../interfaces/weather/weather-forecast.interface';
import { WeatherForecastResponse } from '../interfaces/weather-api/current/weather-api-forecast.interface';
import { WeatherApiError, WeatherApiErrorType } from '../errors/weather-api.error';

@Injectable()
export class WeatherApiProvider implements IWeatherApiProvider {
  private readonly logger = new Logger(WeatherApiProvider.name);
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('WEATHER_API_KEY')!;
    this.baseUrl = this.configService.get<string>('WEATHER_API_URL')!;
  }

  /**
   * Retrieves the current weather information for a specified city.
   *
   * @param city - The name of the city for which to fetch the current weather.
   * @returns A promise that resolves to a `WeatherCurrent` object containing the current weather details.
   *
   * @throws Will throw an error if the HTTP request fails or if the response cannot be mapped to the expected format.
   */
  async getCurrentWeather(city: string): Promise<WeatherCurrent> {
    try {
      const response = await lastValueFrom(
        this.httpService
          .get<IGetCurrentWeatherResponse>(
            `${this.baseUrl}/current.json?key=${this.apiKey}&q=${city}`,
          )
          .pipe(
            map((response) => WeatherMapper.mapCurrentWeather(response.data)),
          ),
      );

      return response;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  /**
   * Fetches autocomplete suggestions for a given city name from the weather API.
   *
   * @param city - The name of the city to get autocomplete suggestions for.
   * @returns A promise that resolves to an array of autocomplete city response objects,
   *          mapped using the `WeatherMapper.mapAutocompleteWeather` function.
   *
   * @throws Will throw an error if the HTTP request fails or if the response cannot be processed.
   */
  async getAutocompleteWeather(city: string): Promise<CityAutocomplete> {
    try {
      const response = await lastValueFrom(
        this.httpService
          .get<
            IAutocompleteCityResponse[]
          >(`${this.baseUrl}/search.json?key=${this.apiKey}&q=${city}`)
          .pipe(
            map((response) =>
              WeatherMapper.mapAutocompleteWeather(response.data),
            ),
          ),
      );

      return response;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  /**
   * Fetches the weather forecast for a specified city.
   *
   * @param city - The name of the city for which to fetch the weather forecast.
   * @returns A promise that resolves to a `WeatherForecast` object containing the forecast details.
   *
   * @throws Will throw an error if the HTTP request fails or if the response cannot be mapped to the expected format.
   */
  async getForecastWeather(city: string): Promise<WeatherForecast> {
    try {
      const response = await lastValueFrom(
        this.httpService
          .get<WeatherForecastResponse>(
            `${this.baseUrl}/forecast.json?key=${this.apiKey}&q=${city}`,
          )
          .pipe(
            map((response) => WeatherMapper.mapForecastWeather(response.data)),
          ),
      );

      return response;
    } catch (error) {
      this.handleApiError(error);
    }
  }

  /**
   * Handles errors from the Weather API and throws a custom error.
   *
   * @param error - The error object from the HTTP request.
   * @throws Throws a `WeatherApiError` with the appropriate status code and message.
   */
  private handleApiError(error: any): never {
    const statusCode = error.response?.status || 500;
    const message = error.response?.data?.error?.message || 'Unknown Weather API error';
    let errorType: WeatherApiErrorType;
    
    this.logger.error(
      `Weather API error: ${statusCode} - ${message}`,
      error.stack,
    );
    
    switch (statusCode) {
      case 400:
        errorType = 'INVALID_REQUEST';
        break;
      case 429:
        errorType = 'API_LIMIT_EXCEEDED';
        break;
      case 500:
        errorType = 'SERVER_ERROR';
        break;
      default:
        errorType = 'UNKNOWN_ERROR';
    }

    throw new WeatherApiError(statusCode, errorType, message);
  }
}
