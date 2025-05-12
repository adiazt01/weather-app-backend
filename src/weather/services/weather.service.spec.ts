import { Test, TestingModule } from '@nestjs/testing';
import { WeatherApiProvider } from '../providers/weather-api.provider';
import { CityQueryDto } from '../dto/city-query.dto';
import { WeatherCurrent } from '../interfaces/weather/weather-current.interface';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;

  const mockWeatherApiProvider = {
    getCurrentWeather: jest.fn(),
    getAutocompleteWeather: jest.fn(),
    getForecastWeather: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        { provide: WeatherApiProvider, useValue: mockWeatherApiProvider },
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getWeather', () => {
    it('should return weather data for a valid city', async () => {
      const cityQueryDto: CityQueryDto = { city: 'London' };
      const mockWeather: WeatherCurrent = { 
        location: {
          city: 'London',
          country: 'UK',
          localTime: '2023-10-01 12:00',
          region: 'England',
        },
        currentWeather: { condition: {
          description: 'Clear',
          icon: '01d',
        },
          feelsLike: {
            celsius: 18,
            fahrenheit: 64,
          },
          humidity: 50,
          temperature:{
            celsius: 20,
            fahrenheit: 68,
          },
          wind: {
            speedKph: 10,
            direction: 'NW',
          },
        },
      };
      
      mockWeatherApiProvider.getCurrentWeather.mockResolvedValue(mockWeather);

      const result = await service.getWeather(cityQueryDto);

      expect(result).toEqual(mockWeather);
      expect(mockWeatherApiProvider.getCurrentWeather).toHaveBeenCalledWith('London');
    });

    it('should throw an error if fetching weather fails', async () => {
      const cityQueryDto: CityQueryDto = { city: 'InvalidCity' };
      mockWeatherApiProvider.getCurrentWeather.mockRejectedValue('City not found');

      await expect(service.getWeather(cityQueryDto)).rejects.toThrow(
        'Failed to fetch weather for city "InvalidCity": City not found',
      );
    });
  });

  describe('getAutocomplete', () => {
    it('should return autocomplete suggestions for a valid city', async () => {
      const cityQueryDto: CityQueryDto = { city: 'Lon' };
      const mockAutocomplete = ['London', 'Long Beach'];
      mockWeatherApiProvider.getAutocompleteWeather.mockResolvedValue(mockAutocomplete);

      const result = await service.getAutocomplete(cityQueryDto);

      expect(result).toEqual(mockAutocomplete);
      expect(mockWeatherApiProvider.getAutocompleteWeather).toHaveBeenCalledWith('Lon');
    });

    it('should throw an error if fetching autocomplete fails', async () => {
      const cityQueryDto: CityQueryDto = { city: 'InvalidCity' };
      mockWeatherApiProvider.getAutocompleteWeather.mockRejectedValue('Autocomplete failed');

      await expect(service.getAutocomplete(cityQueryDto)).rejects.toThrow(
        'Autocomplete failed',
      );
    });
  });

  describe('getForecast', () => {
    it('should return forecast data for a valid city', async () => {
      const cityQueryDto: CityQueryDto = { city: 'London' };
      const mockForecast = { daily: [{ temperature: 15, condition: 'Cloudy' }] };
      mockWeatherApiProvider.getForecastWeather.mockResolvedValue(mockForecast);

      const result = await service.getForecast(cityQueryDto);

      expect(result).toEqual(mockForecast);
      expect(mockWeatherApiProvider.getForecastWeather).toHaveBeenCalledWith('London');
    });

    it('should throw an error if fetching forecast fails', async () => {
      const cityQueryDto: CityQueryDto = { city: 'InvalidCity' };
      mockWeatherApiProvider.getForecastWeather.mockRejectedValue('Forecast failed');

      await expect(service.getForecast(cityQueryDto)).rejects.toThrow(
        'Forecast failed',
      );
    });
  });
});
