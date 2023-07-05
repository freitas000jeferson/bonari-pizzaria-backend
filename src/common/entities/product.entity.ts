import { Prisma } from '@prisma/client';
import { plainToClass } from 'class-transformer';

export class Product implements Prisma.ProductUncheckedCreateInput {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isEnable: boolean;
  createdDate: string | Date;
  updatedDate: string | Date;

  // constructor(product: Record<string, any>) {
  //   if (product) {
  //     this.id = product.id;
  //     this.name = product.name;
  //     this.description = product.description;
  //     this.price = product.price;
  //     this.pieces = product.pieces;
  //     this.isEnable = product.isEnable;
  //     this.category = product.category;
  //     this.createdDate = product.createdDate;
  //     this.updatedDate = product.updatedDate;
  //   }
  // }
}

export class ProductType implements Prisma.ProductTypeCreateInput {
  id: string;
  name: string;
  description?: string | undefined;
  price: number;
  isEnable: boolean;
  category: string;
  createdDate: string | Date;
  updatedDate: string | Date;
}
export const createNewProductType = (product: Product): ProductType => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    isEnable: product.isEnable,
    category: product.category,
    createdDate: product.createdDate,
    updatedDate: product.updatedDate,
  };
};
