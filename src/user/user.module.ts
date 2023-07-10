import { PrismaService } from 'src/common/db/prisma.service';
import { UserReposiitory } from './repository/user.repository';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [PrismaService, UserService, UserReposiitory],
})
export class UserModule {}
