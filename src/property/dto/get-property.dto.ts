import { IsOptional, IsString } from 'class-validator';

export class GetPropertyFilterDto {
  @IsOptional()
  @IsString()
  readonly pageSize: number;
  readonly pageNumber: number;
  readonly keyword: any;
  readonly status: any;
  readonly min: any;
  readonly max: any;
  readonly type: any;
  readonly beds: any;
  readonly rooms: any;
  readonly bath: any;
  readonly mina: number;
  readonly maxa: number;
  readonly location: string;
}
