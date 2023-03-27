import { Address } from './../../common/entities/address.entity';
import { Order } from './../../common/entities/order.entity';
import { Item } from './../../common/entities/item.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  ValidateNested,
  IsBoolean,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateItemByOrderDto } from './create-item-by-order.dto';
import { CreateAddressByOrderDto } from './create-address-by-order.dto';
import { CreateFormOfPaymentByOrderDto } from './create-form-of-payment-by-order.dto';
import { PaymentRateType } from 'src/common/constants/tax';

export class CreateOrderDto extends Order {
  @ApiProperty({
    description: 'Id do cliente',
    type: String,
    example: '030132-1321-132123',
  })
  @IsString()
  clientId: string;

  @ApiProperty({
    description: 'Itens do cliente',
    type: CreateItemByOrderDto,
    example: [
      {
        observation: 'Sem cebola',
        formatPiece: 'inteira',
        quantity: 1,
        products: [
          {
            id: '123-123-123',
            name: 'Calabresa',
            pieces: 8,
          },
        ],
        aditionals: [{ id: '123-123-123', name: 'Bacon', quantity: 1 }],
      },
    ],
  })
  @Type(() => CreateItemByOrderDto)
  @ValidateNested()
  items?: CreateItemByOrderDto[];

  @ApiProperty({
    description: 'Endereço de entrega cliente',
    type: Item,
    example: {
      cep: '62800000',
      uf: 'ce',
      city: 'aracati',
      neighbothood: 'varzea da matriz',
      street: 'Av. Abelardo Gurvel',
      streetNumber: '1551',
      complement: 'Em frente a praça',
    },
  })
  @Type(() => CreateAddressByOrderDto)
  @ValidateNested()
  @IsOptional()
  address: CreateAddressByOrderDto;

  @ApiProperty({
    description: 'Entrega(true) ou retirada(false) do cliente',
    type: Boolean,
    example: true,
  })
  @IsBoolean()
  isDelivery: boolean;

  @ApiProperty({
    description: 'Tipo da forma de pagamento do cliente',
    type: String,
    example: 'DINHEIRO',
    enum: PaymentRateType,
  })
  @IsString()
  @IsEnum(PaymentRateType)
  formOfPaymentName: PaymentRateType;

  @ApiProperty({
    description: 'Forma de pagamento do cliente',
    type: CreateFormOfPaymentByOrderDto,
    example: {
      name: 'DINHEIRO',
      totalReceived: 100,
      needChange: true,
      totalChanged: 21,
    },
  })
  @Type(() => CreateFormOfPaymentByOrderDto)
  @ValidateNested()
  formOfPayment: CreateFormOfPaymentByOrderDto;
}
