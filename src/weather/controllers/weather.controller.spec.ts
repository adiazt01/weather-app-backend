import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { WeatherService } from '../services/weather.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { CityQueryDto } from '../dto/city-query.dto';
import { ExecutionContext } from '@nestjs/common';

describe('WeatherController', () => {
  let controller: WeatherController;
  let weatherService: WeatherService;

  beforeEach(async () => {
    const mockWeatherService = {
      getWeather: jest.fn(),
      getAutocomplete: jest.fn(),
      getForecast: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [
        {
          provide: WeatherService,
          useValue: mockWeatherService,
        },
      ],
    })
      .overrideInterceptor(CacheInterceptor)
      .useValue({
        intercept: jest.fn((context: ExecutionContext, next) => next.handle()),
      })
      .compile();

    controller = module.get<WeatherController>(WeatherController);
    weatherService = module.get<WeatherService>(WeatherService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call WeatherService.getWeather with correct parameters', async () => {
    const cityQueryDto: CityQueryDto = { city: 'London' };
    const mockResponse = {
      currentWeather: {
        condition: {
          description: 'Sunny',
          icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
        },
        feelsLike: {
          celsius: 18,
          fahrenheit: 64,
        },
        humidity: 60,
        temperature: {
          celsius: 20,
          fahrenheit: 68,
        },
        wind: {
          direction: 'N',
          speedKph: 16,
        },

      },
      location: {
        city: 'London',
        country: 'United Kingdom',
        localTime: '2023-10-01 12:00',
        region: 'England',
      }
    };

    jest.spyOn(weatherService, 'getWeather').mockResolvedValue(mockResponse);

    const result = await controller.findCurrentWeather(cityQueryDto);

    expect(weatherService.getWeather).toHaveBeenCalledWith(cityQueryDto);
    expect(result).toEqual(mockResponse);
  });

  it('should call WeatherService.getAutocomplete with correct parameters', async () => {
    const cityQueryDto: CityQueryDto = { city: 'Lon' };
    const mockResponse = {
      country: 'United Kingdom',
      id: 123,
      lattitude: 51.5074,
      longitude: -0.1278,
      name: 'London',
      region: 'England',
      url: '//www.weatherapi.com/weather/uk/london',
    };

    jest.spyOn(weatherService, 'getAutocomplete').mockResolvedValue({
      country: 'United Kingdom',
      id: 123,
      lattitude: 51.5074,
      longitude: -0.1278,
      name: 'London',
      region: 'England',
      url: '//www.weatherapi.com/weather/uk/london',
    });

    const result = await controller.findCityAutocomplete(cityQueryDto);

    expect(weatherService.getAutocomplete).toHaveBeenCalledWith(cityQueryDto);
    expect(result).toEqual(mockResponse);
  });

  it('should call WeatherService.getForecast with correct parameters', async () => {
    const cityQueryDto: CityQueryDto = { city: 'London' };
    const mockResponse = {
      forecast: {
        days: [
          {
            condition: {
              code: 1000,
              description: 'Sunny',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
            },
            date: '2023-10-01',
            temperature: {
              max: {
                celsius: 22,
                fahrenheit: 72,
              },
              min: {
                celsius: 15,
                fahrenheit: 59,
              },
            },
          },
        ],
      },
      location: {
        city: 'London',
        country: 'United Kingdom',
        localTime: '2023-10-01 12:00',
        region: 'England',
      }
    }
    jest.spyOn(weatherService, 'getForecast').mockResolvedValue(
      mockResponse,
    );

    const result = await controller.findForecastWeather(cityQueryDto);

    expect(weatherService.getForecast).toHaveBeenCalledWith(cityQueryDto);
    expect(result).toEqual(mockResponse);
  })
});
