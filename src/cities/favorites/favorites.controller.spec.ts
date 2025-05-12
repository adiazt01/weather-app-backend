import { Test } from '@nestjs/testing';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

describe('FavoritesController', () => {
  let favoritesController: FavoritesController;

  beforeEach(async () => {
    const mockFavoritesService = {
      create: jest.fn(),
      remove: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      controllers: [FavoritesController],
      providers: [
        { provide: FavoritesService, useValue: mockFavoritesService },
      ],
    }).compile();

    favoritesController = moduleRef.get<FavoritesController>(FavoritesController);
  });

  it('should be defined', () => {
    expect(favoritesController).toBeDefined();
  });

  it('should call the addFavorite method with the correct Dto parameter', () => {
    const createFavoriteDto: CreateFavoriteDto = {
      name: 'London',
      region: 'England',
      country: 'United Kingdom',
      lattitude: 51.5074,
      longitude: -0.1278,
      url: 'https://example.com/london',
    };

    const userId = 1;

    const addFavoriteSpy = jest.spyOn(favoritesController, 'create');

    favoritesController.create(createFavoriteDto, userId);

    expect(addFavoriteSpy).toHaveBeenCalledWith(createFavoriteDto, userId);
  });

  it('should call the removeFavorite method with the correct Dto parameter', () => {
    const removeFavoriteDto = {
      userId: 'user123',
      cityId: 'city456',
    };

    const userId = 1;

    const removeFavoriteSpy = jest.spyOn(favoritesController, 'remove');

    favoritesController.remove('city456', userId);

    expect(removeFavoriteSpy).toHaveBeenCalledWith('city456', userId);
  });
});
