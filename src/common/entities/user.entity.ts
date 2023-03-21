import { Prisma, Role } from '@prisma/client';
import { RoleEnum } from './role.enum';

export class User implements Prisma.UserUncheckedCreateInput {
  id?: string | undefined;
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  role?: Role | RoleEnum | undefined;
  isEnable?: boolean | undefined;
  createdDate: string | Date;
  updatedDate: string | Date;
}
