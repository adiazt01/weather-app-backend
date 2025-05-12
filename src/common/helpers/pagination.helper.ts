import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { PaginationOptionsDto } from '../dtos/pagination/pagination-options.dto';
import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { PaginationMetaDto } from '../dtos/pagination/pagination-meta.dto';

export async function paginate<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  paginationOptionsDto: PaginationOptionsDto,
): Promise<PaginationDto<T>> {
  const itemCount = await queryBuilder.getCount();

  queryBuilder
    .skip(paginationOptionsDto.skip)
    .take(paginationOptionsDto.take);

  const { entities, raw } = await queryBuilder.getRawAndEntities();
  
  const pageMetaDto = new PaginationMetaDto({ totalItems: itemCount, paginationOptionsDto: paginationOptionsDto });

  return new PaginationDto(entities, pageMetaDto);
}