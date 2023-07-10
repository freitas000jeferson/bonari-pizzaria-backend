import { Prisma } from '@prisma/client';
import { ClientAtTable } from './client-at-table.entity';
import { Item } from './item.entity';

export class OrderOfTableUncheckedCreateNestedManyWithoutClientInput
  implements Prisma.OrderOfTableUncheckedCreateNestedManyWithoutClientInput {}

export class OrderOfTable implements Prisma.OrderOfTableUncheckedCreateInput {
  id?: string | undefined;
  orderId: number;
  startDate?: string | Date | undefined;
  updateDate: string | Date;
  status: string;
  clientAtTableId: string;
  clientAtTable: ClientAtTable;
  total: number;
  items?: Item[] | undefined;
}
