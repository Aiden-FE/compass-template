import { IsNumber, IsNumberString, IsOptional } from 'class-validator';
import { DEFAULT_PAGE_NUM, DEFAULT_PAGE_SIZE } from '@shared';

export class PaginationRequestFromURLDto {
  @IsOptional()
  @IsNumberString()
  pageNum?: string;

  @IsOptional()
  @IsNumberString()
  pageSize?: string;
}

export class PaginationRequestFromBodyDto {
  @IsOptional()
  @IsNumber()
  pageNum?: number;

  @IsOptional()
  @IsNumber()
  pageSize?: number;
}

export class PaginationResponse<DataItem = unknown> {
  constructor(
    public list: DataItem[] = [],
    public pageNum: number = DEFAULT_PAGE_NUM,
    public pageSize: number = DEFAULT_PAGE_SIZE,
    public total: number = 0,
  ) {}
}
