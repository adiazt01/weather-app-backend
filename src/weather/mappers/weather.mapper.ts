import { ForecastResponse } from '../interfaces/weather-api/forecast/forecast-response.interface';
import {
  IGetAutocompleteWeatherResponse,
  IGetCurrentWeatherResponse,
} from '../interfaces/weather-api/current/weather-api-response.interface';
import { CityAutocomplete } from '../interfaces/weather/city-autocomplete.interface';
import { WeatherCurrent } from '../interfaces/weather/weather-current.interface';
import { WeatherForecast } from '../interfaces/weather/weather-forecast.interface';

export class WeatherMapper {
  static mapCurrentWeather(
    response: IGetCurrentWeatherResponse,
  ): WeatherCurrent {
    return {
      location: {
        city: response.location.name,
        region: response.location.region,
        country: response.location.country,
        localTime: response.location.localtime,
      },
      currentWeather: {
        temperature: {
          celsius: response.current.temp_c,
          fahrenheit: response.current.temp_f,
        },
        feelsLike: {
          celsius: response.current.feelslike_c,
          fahrenheit: response.current.feelslike_f,
        },
        condition: {
          description: response.current.condition.text,
          icon: response.current.condition.icon,
        },
        wind: {
          speedKph: response.current.wind_kph,
          direction: response.current.wind_dir,
        },
        humidity: response.current.humidity,
      },
    };
  }

  static mapAutocompleteWeather(
    response: IGetAutocompleteWeatherResponse,
  ): CityAutocomplete {
    return {
      name: response[0].name,
      country: response[0].country,
      region: response[0].region,
      lattitude: response[0].lat,
      longitude: response[0].lon,
      id: response[0].id,
      url: response[0].url,
    };
  }

  static mapForecastWeather(response: ForecastResponse): WeatherForecast {
    return {
      location: {
        city: response.location.name,
        region: response.location.region,
        country: response.location.country,
        localTime: response.location.localtime,
      },
      forecast: {
        days: response.forecast.forecastday.map(day => ({
          date: day.date.toString(),
          temperature: {
            max: {
              celsius: day.day.maxtemp_c,
              fahrenheit: day.day.maxtemp_f,
            },
            min: {
              celsius: day.day.mintemp_c,
              fahrenheit: day.day.mintemp_f,
            },
          },
          condition: {
            description: day.day.condition.text,
            icon: day.day.condition.icon,
            code: day.day.condition.code,
          },
          hourly: day.hour.map(hour => ({
            time: hour.time,
            temperature: {
              celsius: hour.temp_c,
              fahrenheit: hour.temp_f,
            },
            condition: {
              description: hour.condition.text,
              icon: hour.condition.icon,
            },
            wind: {
              speedKph: hour.wind_kph,
              direction: hour.wind_dir,
            },
            humidity: hour.humidity,
          })),
        })),
      },
    };
  }
}
