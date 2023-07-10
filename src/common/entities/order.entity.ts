import { Prisma } from '@prisma/client';
import { Item } from './item.entity';
import { Address } from './address.entity';
import { FormOfPayment } from './form-of-payment.entity';
import { Client } from './client.entity';

export class Order implements Prisma.OrderUncheckedCreateInput {
  id?: string | undefined;
  orderId: number;
  clientId: string;
  isDelivery?: boolean | undefined;
  deliveryFee: number;
  total: number;
  startDate?: string | Date | undefined;
  updateDate: string | Date;
  status: string;
  items?: Item[] | undefined;
  address?: Address | undefined;
  formOfPayment?: FormOfPayment[];
}
