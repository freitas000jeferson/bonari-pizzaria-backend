import { Address } from '@prisma/client';
import { Client } from 'src/common/entities/client.entity';

export class CreateClientDto extends Client {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  addresses?: Address[];
}
