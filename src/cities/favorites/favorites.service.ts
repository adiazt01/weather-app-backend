import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CityFavorite } from './entities/city-favorite.entity';
import { Repository } from 'typeorm';
import { User } from 'src/core/users/entities/user.entity';

@Injectable()
export class FavoritesService {
  private readonly logger = new Logger(FavoritesService.name);  

  constructor(
    @InjectRepository(CityFavorite)
    private readonly cityFavoriteRepository: Repository<CityFavorite>,
  ) {}

  async create(createFavoriteDto: CreateFavoriteDto, userId: number): Promise<CityFavorite> {
    try {
      const cityFavorite = this.cityFavoriteRepository.create({ ...createFavoriteDto, user: { id: userId } });
      return await this.cityFavoriteRepository.save(cityFavorite);
    } catch (error) {
      throw new InternalServerErrorException('Error creating favorite city');
    }
  }

  async findAll(userId: number) {
    try {
      return await this.cityFavoriteRepository.find({ where: { user: { id: userId } as User } });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching favorite cities');
    }
  }

  async findOne(id: string, userId: number) {
    try {
      return await this.cityFavoriteRepository.findOne({ where: { id, user: { id: userId } as User  } });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching the favorite city');
    }
  }

  async remove(id: string, userId: number): Promise<CityFavorite> {
    try {
      const cityFavorite = await this.cityFavoriteRepository.findOne({ where: { id, user: { id: userId } } });
      if (!cityFavorite) {
        throw new NotFoundException('Favorite city not found');
      }
      return await this.cityFavoriteRepository.remove(cityFavorite);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error removing the favorite city');
    }
  }
}
