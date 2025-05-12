import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, ParseIntPipe } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Auth } from 'src/core/auth/decorators/auth/auth.decorator';
import { GetUser } from 'src/common/decorators/get-user/get-user.decorator';
import { ApiBearerAuth, ApiProperty } from '@nestjs/swagger';

@ApiBearerAuth()
@Auth()
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @ApiProperty({
    description: 'Create a new favorite city',
    type: CreateFavoriteDto,
  })
  create(@Body() createFavoriteDto: CreateFavoriteDto, @GetUser('id', new ParseIntPipe()) user: number) {
    return this.favoritesService.create(createFavoriteDto, user);
  } 

  @Get()
  @ApiProperty({
    description: 'Get all favorite cities',
    type: [CreateFavoriteDto],
  })
  findAll(@GetUser('id', new ParseIntPipe()) userId: number) {
    return this.favoritesService.findAll(userId);
  }

  @Get(':id')
  @ApiProperty({
    description: 'Get a specific favorite city by ID',
    type: CreateFavoriteDto,
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string, @GetUser('id', new ParseIntPipe()) userId: number) {
    return this.favoritesService.findOne(id, userId);
  }

  @Delete(':id')
  @ApiProperty({
    description: 'Remove a favorite city by ID',
  })
  remove(@Param('id', new ParseUUIDPipe()) id: string, @GetUser('id', new ParseIntPipe()) userId: number) {
    return this.favoritesService.remove(id, userId);
  }
}
