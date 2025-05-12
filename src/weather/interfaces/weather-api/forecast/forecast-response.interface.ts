import { ForecastCurrent } from "./forecast-current.interface";
import { ForecastData } from "./forecast-data.interface";
import { ForecastLocation } from "./forecast-location.interface";

export interface ForecastResponse {
  location: ForecastLocation;
  current:  ForecastCurrent;
  forecast: ForecastData;
}