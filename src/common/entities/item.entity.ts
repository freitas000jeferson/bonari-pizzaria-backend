import { AditionalType, Prisma, Product } from '@prisma/client';
import { ProductType } from './product.entity';

export class Item implements Prisma.ItemCreateInput {
  quantity: number;
  observation: string;
  subTotal: number;
  formatPiece: string;
  aditionals?: AditionalType[];
  products?: ProductType[];
}
