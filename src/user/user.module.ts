import { PrismaService } from 'src/common/db/prisma.service';
import { UserRepository } from './repository/user.repository';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [PrismaService, UserService, UserRepository],
  exports: [UserRepository, UserService],
})
export class UserModule {}
