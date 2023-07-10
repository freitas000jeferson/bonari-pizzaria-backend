import { Prisma } from '@prisma/client';
import { Address } from './address.entity';
import { Order } from './order.entity';

export class Client implements Prisma.ClientUncheckedCreateInput {
  id?: string | undefined;
  phoneNumber: string;
  password: string;
  addresses?: Address[];
  orders?: Prisma.OrderUncheckedCreateNestedManyWithoutClientInput | undefined;
  createdDate: string | Date;
  updatedDate: string | Date;
}
