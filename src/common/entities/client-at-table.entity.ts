import { Prisma } from '@prisma/client';
import { User } from './user.entity';
import { FormOfPayment } from './form-of-payment.entity';
export class ClientAtTable implements Prisma.ClientAtTableUncheckedCreateInput {
  id: string;
  tableId: string;
  startDate: Date | string;
  updateDate: Date | string;
  isOpen: boolean;
  userId: string;
  user: User;
  orders?: Prisma.OrderOfTableUncheckedCreateNestedManyWithoutClientInput;
  total: number;
  formOfPayment?: FormOfPayment[];
}
