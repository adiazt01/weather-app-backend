import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, Min } from "class-validator";
import { Order } from "src/common/enums/pagination/pagination.enum";

export class PaginationOptionsDto {
    @ApiPropertyOptional({
        enum: Order,
        default: Order.ASC,
        description: 'Sort order',
        example: Order.ASC,
    })
    @IsOptional()
    @IsEnum(Order)
    order?: Order = Order.ASC;

    @ApiPropertyOptional({
        default: 1,
        description: 'Page number',
        example: 1,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({
        default: 10,
        description: 'Number of items per page',
        example: 10,
        minimum: 1,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    take?: number = 10;
}