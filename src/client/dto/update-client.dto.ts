import { PartialType } from '@nestjs/mapped-types';
import { Address } from '@prisma/client';
import { Client } from 'src/common/entities/client.entity';
import { CreateClientDto } from './create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  addresses?: Address[];
}
