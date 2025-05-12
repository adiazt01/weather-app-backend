import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CityFavorite } from './entities/city-favorite.entity';
import { Repository } from 'typeorm';
import { PaginationOptionsDto } from 'src/common/dtos/pagination/pagination-options.dto';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';
import { paginate } from 'src/common/helpers/pagination.helper';

@Injectable()
export class FavoritesService {
  private readonly logger = new Logger(FavoritesService.name);  

  constructor(
    @InjectRepository(CityFavorite)
    private readonly cityFavoriteRepository: Repository<CityFavorite>,
  ) {}

  async create(createFavoriteDto: CreateFavoriteDto, userId: number): Promise<CityFavorite> {
    try {
      console.log(createFavoriteDto)
      const cityFavorite = this.cityFavoriteRepository.create({ ...createFavoriteDto, user: { id: userId } });
      this.logger.log(`Creating favorite city for user ID: ${userId}`); 
      return await this.cityFavoriteRepository.save(cityFavorite);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async findAll(paginationOptionsDto: PaginationOptionsDto, userId: number): Promise<PaginationDto<CityFavorite>> {
    try {
      const queryBuilder = this.cityFavoriteRepository.createQueryBuilder('cityFavorite')
        .where('cityFavorite.userId = :userId', { userId });

      return await paginate<CityFavorite>(queryBuilder, paginationOptionsDto);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async findOne(id: string, userId: number): Promise<CityFavorite> {
    try {
      const cityFavorite = await this.cityFavoriteRepository.findOne({ where: { id, user: { id: userId } } });
      
      if (!cityFavorite) {
        throw new NotFoundException('Favorite city not found');
      }

      return cityFavorite;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async remove(id: string, userId: number): Promise<CityFavorite> {
    try {
      const cityFavorite = await this.findOne(id, userId);

      await this.cityFavoriteRepository.remove(cityFavorite);

      return cityFavorite;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: Error): void {
    if (error instanceof NotFoundException) {
      this.logger.warn(`Not Found: ${error.message}`);
      throw error;
    }
    
    throw new InternalServerErrorException('An unexpected error occurred');
  }
}
