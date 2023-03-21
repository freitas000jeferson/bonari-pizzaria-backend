import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class QueryParamsDto {
  @ApiProperty({
    description: 'consulta por name',
    type: String,
    example: 'água',
    required: false,
  })
  @IsString()
  name?: string = '';
  @ApiProperty({
    description: 'consulta por descrição do produto',
    type: String,
    example: 'água',
    required: false,
  })
  @IsString()
  description?: string = '';

  @ApiProperty({
    description: 'consulta por categoria do produto',
    type: String,
    example: 'BEBIDA',
    required: false,
  })
  @IsString()
  category?: string = '';
}

export const makeWhereDescriptionAndName = (
  query: QueryParamsDto
): Prisma.ProductWhereInput => {
  return {
    AND: {
      description: query.description
        ? { contains: query.description, mode: 'insensitive' }
        : undefined,
      name: query.name
        ? { contains: query.name, mode: 'insensitive' }
        : undefined,
      category: query.category
        ? { contains: query.category, mode: 'insensitive' }
        : undefined,
    },
  };
};
