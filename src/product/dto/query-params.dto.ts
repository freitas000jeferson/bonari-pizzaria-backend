import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryParamsDto {
  @ApiProperty({
    description: 'consulta por name',
    type: String,
    example: 'água',
  })
  @IsNotEmpty()
  name: string;
}
