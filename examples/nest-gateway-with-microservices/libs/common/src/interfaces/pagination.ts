import { IsOptional, IsInt, Min, IsNumberString } from 'class-validator';

/**
 * 分页元数据
 */
export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}

/**
 * 响应数据 data 内的分页数据结构
 * @param T 数据类型
 */
export interface PaginationData<T = any> extends Pagination {
  content: T[];
}

export class PaginationQueryDto {
  @IsOptional()
  @IsNumberString()
  page?: number;

  @IsOptional()
  @IsNumberString()
  pageSize?: number;
}

export class PaginationBodyDto {
  constructor(data?: Partial<Pagination>) {
    this.page = data?.page ? Math.max(0, Math.floor(Number(data.page))) : 0;
    this.pageSize = data?.pageSize
      ? Math.max(1, Math.floor(Number(data.pageSize)))
      : 20;
  }

  @IsOptional()
  @IsInt()
  @Min(0)
  page: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  pageSize: number;
}
