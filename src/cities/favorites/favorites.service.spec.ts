import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesService } from './favorites.service';
import { Repository } from 'typeorm';
import { CityFavorite } from './entities/city-favorite.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let cityFavoriteRepository: Repository<CityFavorite>;

  beforeEach(async () => {
    const mockCityFavoriteRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritesService,
        {
          provide: getRepositoryToken(CityFavorite),
          useValue: mockCityFavoriteRepository,
        }
      ],
    }).compile();

    cityFavoriteRepository = module.get<Repository<CityFavorite>>(getRepositoryToken(CityFavorite));

    service = module.get<FavoritesService>(FavoritesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and save a favorite city', async () => {
    const createFavoriteDto = { 
      name: 'Test City', 
      region: 'Test Region', 
      country: 'Test Country', 
      latitude: 0, 
      longitude: 0 
    };
    
    const userId = 1;
    const savedCityFavorite = { 
      id: 'city-id', 
      ...createFavoriteDto, 
      userId, 
      user: { 
        id: userId, 
        username: 'Test User', 
        email: 'test@example.com', 
        password: 'hashed-password', 
        cityFavorites: [], 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      createdAt: new Date(), 
      updatedAt: new Date() 
    };

    jest.spyOn(cityFavoriteRepository, 'save').mockResolvedValue({
      id: 'city-id',
      name: 'Test City',
      region: 'Test Region',
      country: 'Test Country',
      latitude: 0,
      longitude: 0,
      user: {
        id: 1,
        username: 'Test User',
        email: 'test@example.com',
        password: 'hashed-password',
        cityFavorites: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await service.create(createFavoriteDto, userId);

    expect(cityFavoriteRepository.save).toHaveBeenCalledWith({
      ...createFavoriteDto,
      userId,
    });
    expect(result).toEqual(savedCityFavorite);
  });

  it('should throw an error if saving fails', async () => {
    const createFavoriteDto = { name: 'Test City', region: 'Test Region', country: 'Test Country', latitude: 0, longitude: 0 };
    const userId = 1;

    jest.spyOn(cityFavoriteRepository, 'save').mockRejectedValue(new Error('Database save error'));

    await expect(service.create(createFavoriteDto, userId)).rejects.toThrow('Error creating favorite city');
  });

  it('should return all favorite cities for a user', async () => {
    const userId = 1;
    const favoriteCities = [{
      id: 'city-id',
      name: 'Test City',
      region: 'Test Region',
      country: 'Test Country',
      latitude: 0,
      longitude: 0,
      user: {
        id: userId,
        username: 'Test User',
        email: 'test@example.com',
        password: 'hashed-password',
        cityFavorites: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    }];

    jest.spyOn(cityFavoriteRepository, 'find').mockResolvedValue(favoriteCities);

    const result = await service.findAll(userId);

    expect(cityFavoriteRepository.find).toHaveBeenCalledWith({ where: { user: { id: userId } } });
    expect(result).toEqual(favoriteCities);
  });

  it('should throw an error if fetching fails', async () => {
    const userId = 1;

    jest.spyOn(cityFavoriteRepository, 'find').mockRejectedValue(new Error());

    await expect(service.findAll(userId)).rejects.toThrow('Error fetching favorite cities');
  });

  it('should return a specific favorite city for a user', async () => {
    const id = 'city-id';
    const userId = 1;
    const favoriteCity = {
      id,
      name: 'Test City',
      region: 'Test Region',
      country: 'Test Country',
      latitude: 0,
      longitude: 0,
      user: {
        id: userId,
        username: 'Test User',
        email: 'test@example.com',
        password: 'hashed-password',
        cityFavorites: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(cityFavoriteRepository, 'findOne').mockResolvedValue(favoriteCity);

    const result = await service.findOne(id, userId);

    expect(cityFavoriteRepository.findOne).toHaveBeenCalledWith({ where: { id, user: { id: userId } } });
    expect(result).toEqual(favoriteCity);
  });

  it('should throw an error if fetching fails', async () => {
    const id = 'city-id';
    const userId = 1;

    jest.spyOn(cityFavoriteRepository, 'findOne').mockRejectedValue(new Error());

    await expect(service.findOne(id, userId)).rejects.toThrow('Error fetching the favorite city');
  });

  it('should remove a favorite city', async () => {
    const id = 'city-id';
    const userId = 1;
    const favoriteCity = {
      id,
      name: 'Test City',
      region: 'Test Region',
      country: 'Test Country',
      latitude: 0,
      longitude: 0,
      user: {
        id: userId,
        username: 'Test User',
        email: 'test@example.com',
        password: 'hashed-password',
        cityFavorites: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(cityFavoriteRepository, 'findOne').mockResolvedValue(favoriteCity);
    jest.spyOn(cityFavoriteRepository, 'remove').mockResolvedValue(favoriteCity);

    const result = await service.remove(id, userId);

    expect(cityFavoriteRepository.findOne).toHaveBeenCalledWith({ where: { id, user: { id: userId } } });
    expect(cityFavoriteRepository.remove).toHaveBeenCalledWith(favoriteCity);
    expect(result).toEqual(favoriteCity);
  });

  it('should throw an error if the favorite city is not found', async () => {
    const id = 'city-id';
    const userId = 1;

    jest.spyOn(cityFavoriteRepository, 'findOne').mockResolvedValue(null);

    await expect(service.remove(id, userId)).rejects.toThrow('Favorite city not found');
  });

  it('should throw an error if removing fails', async () => {
    const id = 'city-id';
    const userId = 1;
    const favoriteCity = { 
      id, 
      name: 'Test City', 
      region: 'Test Region', 
      country: 'Test Country', 
      latitude: 0, 
      longitude: 0, 
      userId, 
      user: { 
        id: userId, 
        username: 'Test User', 
        email: 'test@example.com', 
        password: 'hashed-password', 
        cityFavorites: [], 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      createdAt: new Date(), 
      updatedAt: new Date() 
    };


    jest.spyOn(cityFavoriteRepository, 'findOne').mockResolvedValue(favoriteCity);
    jest.spyOn(cityFavoriteRepository, 'remove').mockRejectedValue(new Error());

    await expect(service.remove(id, userId)).rejects.toThrow('Error removing the favorite city');
  });
});
