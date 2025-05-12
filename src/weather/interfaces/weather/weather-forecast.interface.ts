export interface WeatherForecast {
  location: {
    city: string;
    region: string;
    country: string;
    localTime: string;
  };
  forecast: {
    days: Array<{
      date: string;
      temperature: {
        max: {
          celsius: number;
          fahrenheit: number;
        };
        min: {
          celsius: number;
          fahrenheit: number;
        };
      };
      condition: {
        description: string;
        icon: string;
        code: number;
      };
    }>;
  };
}