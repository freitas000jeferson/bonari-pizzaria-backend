import { Product } from '../../common/entities/product.entity';
import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto extends Product {
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
