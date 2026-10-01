import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({
    example: 'Стрижка',
    description: 'Название услуги',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 1500,
    description: 'Стоимость услуги',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  price: number;
}