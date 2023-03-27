import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsBoolean, IsOptional } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    description: 'Nome do produto',
    type: String,
    example: 'água',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Descrição do produto',
    type: String,
    example: 'água',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Preço do produto',
    type: Number,
    example: 10.99,
  })
  @IsNumber()
  price: number;
  @ApiProperty({
    description: 'Pedaço do produto',
    type: Number,
    example: 1,
  })
  @IsNumber()
  pieces: number;

  @ApiProperty({
    description: 'Produto está habilitado',
    type: Boolean,
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isEnable?: boolean | undefined;

  @ApiProperty({
    description: 'Categoria do produto',
    type: String,
    example: 'BEBIDA',
  })
  @IsString()
  category: string;
}
