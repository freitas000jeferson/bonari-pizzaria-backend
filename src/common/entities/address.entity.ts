import { Prisma } from '@prisma/client';
export class Address implements Prisma.AddressCreateInput {
  cep: string;
  uf: string;
  city: string;
  neighbothood: string;
  street: string;
  streetNumber: string;
  complement: string;
  localityId?: string;
}
