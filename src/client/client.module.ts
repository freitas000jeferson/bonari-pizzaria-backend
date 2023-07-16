import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { PrismaService } from 'src/common/db/prisma.service';

@Module({
  imports: [],
  controllers: [ClientController],
  providers: [PrismaService, UserService, UserRepository],
  exports: [UserRepository, UserService],
})
export class ClientModule {}
