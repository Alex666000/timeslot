import { ApiProperty } from '@nestjs/swagger';

export class ServiceResponseDto {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'Стрижка',
  })
  name: string;

  @ApiProperty({
    example: 1500,
  })
  price: number;
}