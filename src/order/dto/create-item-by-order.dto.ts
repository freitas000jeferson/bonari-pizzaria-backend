import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  ValidateNested,
  IsEnum,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { PieceType } from 'src/common/constants/pieces-category';
import { AditionalType } from 'src/common/entities/aditional.entity';
import { Item } from 'src/common/entities/item.entity';
import { ProductType } from 'src/common/entities/product.entity';

export class CreateProductByItemDto extends ProductType {
  @ApiProperty({
    description: 'Id do produto',
    type: String,
    example: '0000-123-1233412',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Nome do produto',
    type: String,
    example: 'Calabresa',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Numero de pedaços do produto',
    type: Number,
    example: 4,
  })
  @IsNumber()
  pieces: number;
}

export class CreateAditionalByItemDto extends AditionalType {
  @ApiProperty({
    description: 'Id do adicional',
    type: String,
    example: '0000-123-1233412',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Nome do adicional',
    type: String,
    example: 'Bacon',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Quantidade do adicional',
    type: Number,
    example: 1,
  })
  @IsNumber()
  quantity: number;
}

export class CreateItemByOrderDto extends Item {
  @ApiProperty({
    description: 'Observação no item',
    type: String,
    example: 'Sem cebola',
  })
  @IsString()
  observation: string;

  @ApiProperty({
    description: 'Formato do item',
    type: String,
    example: 'INTEIRA',
    enum: PieceType,
  })
  @IsEnum(PieceType)
  formatPiece: PieceType;

  @ApiProperty({
    description: 'Quantidade do produto',
    type: Number,
    example: 2,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'Lista de produtos no item',
    type: CreateProductByItemDto,
    example: [{}],
    maxItems: 2,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(2)
  @Type(() => CreateProductByItemDto)
  @ValidateNested()
  products?: CreateProductByItemDto[] | undefined;

  @ApiProperty({
    description: 'Lista de adicionais no item',
    type: CreateAditionalByItemDto,
    example: [{}],
  })
  @Type(() => CreateAditionalByItemDto)
  @ValidateNested()
  aditionals?: CreateAditionalByItemDto[] | undefined;
}
