import { IAutocompleteCityResponse } from '../autocomplete/weather-api-autocomplete.interface';
import { IWeatherCurrentResponse } from './weather-api-current.interface';
import { IWeatherLocationResponse } from './weather-api-location.interface';

export interface IGetCurrentWeatherResponse {
  location: IWeatherLocationResponse;
  current: IWeatherCurrentResponse;
}

export type IGetAutocompleteWeatherResponse = IAutocompleteCityResponse[];