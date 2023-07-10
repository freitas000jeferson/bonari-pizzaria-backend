import { Prisma } from '@prisma/client';

export class AccessToken {
  id: string;
  userId?: string;
  clientId?: string;
  token: string;
  refreshToken: string;
  expired: boolean;
  createdDate: Date | string;
  updatedDate: Date | string;
}
