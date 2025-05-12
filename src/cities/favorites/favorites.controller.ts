import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, ParseIntPipe, Query } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Auth } from 'src/core/auth/decorators/auth/auth.decorator';
import { GetUser } from 'src/common/decorators/get-user/get-user.decorator';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { PaginationOptionsDto } from 'src/common/dtos/pagination/pagination-options.dto';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';
import { CityFavorite } from './entities/city-favorite.entity';

@ApiBearerAuth()
@Auth()
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @ApiOperation({
    summary: 'Add a city to favorites',
    description: 'Add a city to the user\'s favorite list',
  })
  @ApiOkResponse({
    description: 'City added to favorites successfully',
    type: CityFavorite,
  })
  create(@Body() createFavoriteDto: CreateFavoriteDto, @GetUser('id', new ParseIntPipe()) user: number) {
    return this.favoritesService.create(createFavoriteDto, user);
  } 

  @Get()
  @ApiOperation({
    summary: 'Get all favorite cities',
    description: 'Get all favorite cities from the user',
  })
  @ApiOkResponse({
    description: 'Posts retrieved successfully',
    type: PaginationDto<CityFavorite>,
  })
  findAll(@GetUser('id', new ParseIntPipe()) userId: number, @Query() paginationOptionsDto: PaginationOptionsDto) {
    return this.favoritesService.findAll(paginationOptionsDto, userId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific favorite city',
    description: 'Get a specific favorite city by ID',
  })
  @ApiOkResponse({
    description: 'City retrieved successfully',
    type: CityFavorite,
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string, @GetUser('id', new ParseIntPipe()) userId: number) {
    return this.favoritesService.findOne(id, userId);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove a favorite city',
    description: 'Remove a favorite city from the user\'s list',
  })
  @ApiOkResponse({
    description: 'Favorite city removed successfully',
  })
  remove(@Param('id', new ParseUUIDPipe()) id: string, @GetUser('id', new ParseIntPipe()) userId: number) {
    return this.favoritesService.remove(id, userId);
  }
}
