import { Prisma } from '@prisma/client';
import { Item } from './item.entity';
import { Address } from './address.entity';

export class Order implements Prisma.OrderUncheckedCreateInput {
  id?: string | undefined;
  orderId: number;
  clientId: string;
  items?: Item[];
  address: Address;
  isDelivery?: boolean;
  deliveryFee: number;
  total: number;
  startDate?: string | Date | undefined;
  updateDate: string | Date;
  status: string;
}
