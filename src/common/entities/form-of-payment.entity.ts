import { Prisma } from '@prisma/client';
// extends Prisma.FormOfPaymentCreateInput
export class FormOfPayment {
  name: string;
  totalReceived: number;
  needChange?: boolean;
  totalChanged?: number;
}
