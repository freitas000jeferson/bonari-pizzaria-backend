import { Prisma } from '@prisma/client';
import { Item } from './item.entity';
import { Address } from './address.entity';
import { FormOfPayment } from './form-of-payment.entity';
import { Client } from './client.entity';

export class Order implements Prisma.OrderUncheckedCreateInput {
  id?: string | undefined;
  orderId: number;
  startDate: string | Date;
  updateDate: string | Date | undefined;
  status: string;
  client: Client;
  clientId: string;
  items: Item[];
  address?: Address | undefined;
  isDelivery: boolean;
  deliveryFee: number;
  total: number;
  formOfPayment: FormOfPayment[];
}
