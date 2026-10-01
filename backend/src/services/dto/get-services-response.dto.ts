import { ApiProperty } from '@nestjs/swagger';

import { ServiceResponseDto } from './service-response.dto.js';

export class GetServicesResponseDto {
  @ApiProperty({
    type: [ServiceResponseDto],
  })
  items: ServiceResponseDto[];

  @ApiProperty({
    example: 25,
    description: 'Общее количество найденных услуг',
  })
  total: number;

  @ApiProperty({
    example: 1,
    description: 'Текущая страница',
  })
  page: number;

  @ApiProperty({
    example: 10,
    description: 'Количество элементов на странице',
  })
  pageSize: number;

  @ApiProperty({
    example: 3,
    description: 'Общее количество страниц',
  })
  pagesCount: number;
}