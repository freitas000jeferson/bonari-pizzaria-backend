import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsInt,
  IsEmpty,
  ValidateIf,
  IsNumberString,
} from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    description: 'Número da Página',
    type: Number,
    example: 0,
    default: 0,
    required: false,
  })
  @IsNumberString()
  page?: number = Number(0);

  @ApiProperty({
    description: 'Quantidade de itens por Página',
    type: Number,
    example: 10,
    default: Number(10),
    required: false,
  })
  @IsNumberString()
  size?: number = 10;

  @ApiProperty({
    description: 'Ordenação dos itens da Página',
    type: String,
    example: 'asc',
    default: 'asc',
    required: false,
  })
  @IsString()
  sort?: string = 'asc';

  @ApiProperty({
    description: 'Item a ser ordenado na Página',
    type: String,
    example: 'name',
    default: 'name',
    required: false,
  })
  @IsString()
  order?: string = '';
}
export const makePaginationHelper = ({
  page = 0,
  size = 10,
  sort,
  order,
}: PaginationDto) => {
  let orderBy = undefined;
  if (sort && order) {
    orderBy = { [sort]: order };
  }
  return {
    skip: page * size,
    take: Number(size),
    orderBy,
  };
};
