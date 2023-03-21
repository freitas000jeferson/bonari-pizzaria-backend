import { Prisma } from '@prisma/client';
import { Address } from './address.entity';
import { Order } from './order.entity';

export class Client implements Prisma.ClientUncheckedCreateInput {
  createdDate: string | Date;
  updatedDate: string | Date;
  orders?: Prisma.OrderUncheckedCreateNestedManyWithoutClientInput | undefined;
  id?: string | undefined;
  phoneNumber: string;
  addresses?: Address[];
}
