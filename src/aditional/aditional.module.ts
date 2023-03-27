import { Module } from '@nestjs/common';
import { AditionalService } from './aditional.service';
import { AditionalController } from './aditional.controller';
import { AditionalRepository } from './repositories/aditional.repository';
import { PrismaService } from './../common/db/prisma.service';

@Module({
  controllers: [AditionalController],
  providers: [AditionalService, AditionalRepository, PrismaService],
  exports: [AditionalRepository],
})
export class AditionalModule {}
