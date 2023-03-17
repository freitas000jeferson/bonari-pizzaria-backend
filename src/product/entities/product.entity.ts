import { Prisma } from '@prisma/client';

export class Product implements Prisma.ProductUncheckedCreateInput {
  id?: string | undefined;
  name: string;
  description: string;
  price: number;
  pieces: number;
  isEnable?: boolean | undefined;
  category: string;
  createdDate: string | Date;
  updatedDate: string | Date;
}
