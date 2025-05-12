import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { PaginationMetaParameters } from "src/common/interface/pagination/pagination-meta-parameters.interface";

export class PaginationMetaDto {
    @ApiPropertyOptional({
        description: 'Current page number',
        example: 1,
        default: 1,
        type: Number,
        minimum: 1,
    })
    page?: number;

    @ApiPropertyOptional({
        description: 'Number of items per page',
        example: 10,
        default: 10,
        type: Number,
        minimum: 1,
    })
    take?: number;

    @ApiPropertyOptional({
        description: 'Total number of items',
        example: 100,
        default: 0,
        type: Number,
        minimum: 0,
    })
    totalItems?: number;

    @ApiPropertyOptional({
        description: 'Total number of pages',
        example: 10,
        default: 0,
        type: Number,
        minimum: 0,
    })
    @IsOptional()
    totalPages?: number;

    constructor({
        paginationOptionsDto,
        totalItems,
    }: PaginationMetaParameters) {
        this.page = paginationOptionsDto.page;
        this.take = paginationOptionsDto.take;
        this.totalItems = totalItems;
        this.totalPages = Math.ceil(totalItems / (paginationOptionsDto.take ?? 1));
    }    
}