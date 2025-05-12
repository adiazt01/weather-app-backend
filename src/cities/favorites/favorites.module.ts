import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityFavorite } from './entities/city-favorite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CityFavorite,
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
