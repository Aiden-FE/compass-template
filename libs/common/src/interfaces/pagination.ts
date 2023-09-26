import { IsNumber } from 'class-validator';

export class PaginationQueryDto {
  @IsNumber()
  pageNum: number;

  @IsNumber()
  pageSize: number;
}

export class PaginationReply<Data = any> {
  pageNum: number;

  pageSize: number;

  total: number;

  list: Data[] = [];

  constructor(option: PaginationQueryDto & { list?: Data[]; total: number }) {
    this.pageNum = option.pageNum;
    this.pageSize = option.pageSize;
    this.total = option.pageNum;
    this.list = option.list || [];
    this.total = option.total;
  }
}
