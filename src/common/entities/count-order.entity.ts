import { Prisma } from '@prisma/client';
export class CountOrder implements Prisma.CountOrderUncheckedCreateInput {
  id?: string | undefined;
  count: number;
  date: string | Date;
}
