import { Prisma } from '@prisma/client';
import { AditionalType } from './aditional.entity';
import { ProductType } from './product.entity';

export class Item implements Prisma.ItemCreateInput {
  observation?: string | undefined;
  category: string;
  type: string;
  pieces: number;
  aditionals: AditionalType[];
  products: ProductType[];
  quantity: number;
  subTotal: number;

  // constructor(data: Record<string, any>) {
  //   if (data) {
  //     this.observation = this.observation;
  //     this.quantity = this.quantity;
  //     this.subTotal = this.subTotal;
  //     this.pieces = this.pieces;
  //     this.aditionals = this.aditionals;
  //     this.products = this.products;
  //   }
  // }
}
