import { Prisma } from '@prisma/client';

export class Locality /*implements Prisma.LocalityCreateInput*/ {
  id: string;
  name: string;
  price: number;
}
