import { Prisma } from '@prisma/client';
import { plainToClass } from 'class-transformer';

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
  createType() {
    return plainToClass(ProductType, this);
  }
}

export class ProductType implements Prisma.ProductTypeCreateInput {
  id: string;
  name: string;
  description: string;
  price: number;
  pieces: number;
  isEnable?: boolean | undefined;
  category: string;
  createdDate: string | Date;
  updatedDate: string | Date;
}
