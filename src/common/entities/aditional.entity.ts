import { Prisma } from '@prisma/client';
import { plainToClass } from 'class-transformer';

export class Aditional implements Prisma.AditionalUncheckedCreateInput {
  id?: string | undefined;
  name: string;
  price: number;
  quantity: number;
  isEnable?: boolean | undefined;
  createdDate: string | Date;
  updatedDate: string | Date;
  createType() {
    return plainToClass(AditionalType, this);
  }
}

export class AditionalType implements Prisma.AditionalTypeCreateInput {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isEnable?: boolean | undefined;
  createdDate: string | Date;
  updatedDate: string | Date;
}
