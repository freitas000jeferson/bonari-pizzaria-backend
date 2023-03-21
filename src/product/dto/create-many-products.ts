import { Type } from 'class-transformer';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
export class CreateManyProducts {
  @ApiProperty({ description: 'Dados da requisição' })
  @ArrayNotEmpty()
  @Type(() => CreateProductDto)
  @ValidateNested()
  data: CreateProductDto[];
}
