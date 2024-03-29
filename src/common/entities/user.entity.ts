import { Prisma } from '@prisma/client';
import { RoleUserEnum } from './role-user.enum';

export class User implements Prisma.UserUncheckedCreateInput {
  id?: string | undefined;
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: RoleUserEnum;
  isEnable: boolean;
  createdDate: string | Date;
  updatedDate: string | Date;
}
