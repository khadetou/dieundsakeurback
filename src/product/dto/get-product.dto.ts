import { IsOptional, IsString } from 'class-validator';

export class GetProductsFilterDto {
  @IsOptional()
  @IsString()
  readonly pageSize: number;
  readonly pageNumber: number;
  readonly keyword: any;
  readonly category: string;
}
