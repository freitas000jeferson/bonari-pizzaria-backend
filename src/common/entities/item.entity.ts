import { Prisma } from '@prisma/client';
import { AditionalType } from './aditional.entity';
import { ProductType } from './product.entity';

export class Item implements Prisma.ItemCreateInput {
  quantity: number;
  observation: string;
  subTotal: number;
  formatPiece: string;
  aditionals?: AditionalType[];
  products?: ProductType[];

  constructor(data: Record<string, any>) {
    if (data) {
      this.quantity = this.quantity;
      this.observation = this.observation;
      this.subTotal = this.subTotal;
      this.formatPiece = this.formatPiece;
      this.aditionals = this.aditionals;
      this.products = this.products;
    }
  }
}
