import { CityAutocomplete } from '../weather/city-autocomplete.interface';
import { WeatherCurrent } from '../weather/weather-current.interface';
import { WeatherForecast } from '../weather/weather-forecast.interface';

export interface IWeatherApiProvider {
  getCurrentWeather(city: string): Promise<WeatherCurrent>;
  getAutocompleteWeather(city: string): Promise<CityAutocomplete>;
  getForecastWeather(city: string): Promise<WeatherForecast>;
}
