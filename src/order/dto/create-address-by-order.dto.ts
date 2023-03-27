import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Address } from 'src/common/entities/address.entity';

export class CreateAddressByOrderDto extends Address {
  @ApiProperty({
    description: 'Cep',
    type: String,
    example: '62800000',
  })
  @IsString()
  cep: string;

  @ApiProperty({
    description: 'UF',
    type: String,
    example: 'ce',
  })
  @IsString()
  uf: string;

  @ApiProperty({
    description: 'Cidade',
    type: String,
    example: 'aracati',
  })
  @IsString()
  city: string;

  @ApiProperty({
    description: 'Bairro',
    type: String,
    example: 'varzea da matriz',
  })
  @IsString()
  neighbothood: string;

  @ApiProperty({
    description: 'Rua',
    type: String,
    example: 'Av. Abelardo Gurve',
  })
  @IsString()
  street: string;

  @ApiProperty({
    description: 'Número',
    type: String,
    example: '1551',
  })
  @IsString()
  streetNumber: string;

  @ApiProperty({
    description: 'Complemento',
    type: String,
    example: 'Em frente a praça',
  })
  @IsString()
  complement: string;
}
