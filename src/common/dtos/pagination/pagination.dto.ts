import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { PaginationMetaDto } from "./pagination-meta.dto";

export class PaginationDto<T> {
    @IsArray()
    @ApiProperty({
        isArray: true,
    })
    items: T[];
    
    @ApiProperty({
        type: () => PaginationMetaDto,
    })
    meta: PaginationMetaDto;
}