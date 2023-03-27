import { Prisma } from '@prisma/client';
import { plainToClass } from 'class-transformer';

export class Aditional implements Prisma.AditionalUncheckedCreateInput {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isEnable: boolean;
  createdDate: string | Date;
  updatedDate: string | Date;
  // constructor(aditional: Record<string, any>) {
  //   if (aditional) {
  //     this.id = aditional.id;
  //     this.name = aditional.name;
  //     this.price = aditional.price;
  //     this.quantity = aditional.quantity;
  //     this.isEnable = aditional.isEnable;
  //     this.createdDate = aditional.createdDate;
  //     this.updatedDate = aditional.updatedDate;
  //   }
  // }
}

export class AditionalType implements Prisma.AditionalTypeCreateInput {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isEnable?: boolean | undefined;
  createdDate: string | Date;
  updatedDate: string | Date;

  // constructor(aditional: Aditional) {
  //   this.id = aditional.id!;
  //   this.name = aditional.name;
  //   this.price = aditional.price;
  //   this.quantity = aditional.quantity;
  //   this.isEnable = aditional.isEnable;
  //   this.createdDate = aditional.createdDate;
  //   this.updatedDate = aditional.updatedDate;
  // }
}

export const createNewAditionalType = (aditional: Aditional): AditionalType => {
  return {
    id: aditional.id,
    name: aditional.name,
    price: aditional.price,
    quantity: aditional.quantity,
    isEnable: aditional.isEnable,
    createdDate: aditional.createdDate,
    updatedDate: aditional.updatedDate,
  };
};
