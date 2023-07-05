import { Prisma } from '@prisma/client';
// extends Prisma.FormOfPaymentCreateInput
export class FormOfPayment implements Prisma.FormOfPaymentCreateInput {
  name: string;
  totalReceived: number;
  needChange?: boolean;
  totalChanged?: number;
}
