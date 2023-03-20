import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsInt } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    description: 'Número da Página',
    type: Number,
    example: 0,
    default: 0,
  })
  @IsInt()
  page?: number = 0;

  @ApiProperty({
    description: 'Quantidade de itens por Página',
    type: Number,
    example: 10,
    default: 10,
  })
  @IsInt()
  size?: number = 10;

  @ApiProperty({
    description: 'Ordenação dos itens da Página',
    type: Number,
    example: 'asc',
    default: 'asc',
  })
  @IsString()
  sort?: string = 'asc';

  @ApiProperty({
    description: 'Item a ser ordenado na Página',
    type: Number,
    example: 'name',
    default: 'name',
  })
  @IsString()
  order?: string = '';
}
export const makePaginationHelper = ({
  page = 0,
  size = 10,
  sort = 'name',
  order = 'asc',
}: PaginationDto) => {
  return {
    skip: page * size,
    take: Number(size),
    orderBy: { [sort]: order },
  };
};
