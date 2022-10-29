import { IsOptional, IsString } from 'class-validator';

export class GetPropertyFilterDto {
  @IsOptional()
  @IsString()
  readonly pageSize: number;
  readonly pageNumber: number;
  readonly keyword: any;
  readonly location: string;
}
