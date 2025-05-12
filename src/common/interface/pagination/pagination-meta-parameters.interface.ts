import { PaginationOptionsDto } from "src/common/dtos/pagination/pagination-options.dto";

export interface PaginationMetaParameters {
    paginationOptionsDto: PaginationOptionsDto,
    totalItems: number,
}