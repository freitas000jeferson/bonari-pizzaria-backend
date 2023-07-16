import { Prisma } from '@prisma/client';
import { Address } from './address.entity';
import { Order } from './order.entity';

export class Client implements Prisma.ClientUncheckedCreateInput {
  id?: string | undefined;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  addresses?: Address[];
  orders?: Prisma.OrderUncheckedCreateNestedManyWithoutClientInput | undefined;
  createdDate: string | Date;
  updatedDate: string | Date;
}
export class ClientType implements Prisma.ClientTypeCreateInput {
  id?: string | undefined;
  name: string;
  email?: string;
  phoneNumber: string;
  addresses?: Address[];
  createdDate: string | Date;
  updatedDate: string | Date;
}
