import { IsEnum, IsString, IsNumber, IsBoolean } from 'class-validator';
import { FormOfPayment } from 'src/common/entities/form-of-payment.entity';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentRateType } from 'src/common/constants/tax';

export class CreateFormOfPaymentByOrderDto extends FormOfPayment {
  @ApiProperty({
    description: 'Tipo da forma de pagamento do cliente',
    type: String,
    example: 'DINHEIRO',
    enum: PaymentRateType,
  })
  @IsString()
  @IsEnum(PaymentRateType)
  name: string;

  @ApiProperty({
    description: 'Quanto o Cliente vai pagar',
    type: Number,
    example: 100,
  })
  @IsNumber()
  totalReceived: number;

  @ApiProperty({
    description: 'O Cliente vai precisar de troco',
    type: Boolean,
    example: true,
  })
  @IsBoolean()
  needChange?: boolean;

  @ApiProperty({
    description: 'Total do troco que o Cliente vai receber',
    type: Number,
    example: 21,
  })
  @IsNumber()
  totalChanged?: number;
}
