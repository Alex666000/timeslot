import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export enum ServiceSortBy {
  Name = 'name',
  Price = 'price',
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export class GetServicesQueryDto {
  @ApiPropertyOptional({
    example: 'масс',
    description: 'Поиск по названию услуги',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    example: 1000,
    description: 'Минимальная цена',
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({
    example: 3000,
    description: 'Максимальная цена',
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional({
    enum: ServiceSortBy,
    example: ServiceSortBy.Price,
    description: 'Поле сортировки',
  })
  @IsOptional()
  @IsEnum(ServiceSortBy)
  sortBy?: ServiceSortBy;

  @ApiPropertyOptional({
    enum: SortOrder,
    example: SortOrder.Asc,
    description: 'Направление сортировки',
  })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;

  @ApiPropertyOptional({
    example: 1,
    description: 'Номер страницы',
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Количество элементов на странице',
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize?: number;
}
