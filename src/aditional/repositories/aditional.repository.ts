import { PrismaService } from './../../common/db/prisma.service';
import { Injectable } from '@nestjs/common';
import { Aditional } from './../entities/aditional.entity';

@Injectable()
export class AditionalRepository {
  private repository;
  constructor(private readonly prismaService: PrismaService) {
    this.repository = this.prismaService.aditional;
  }
  async getById(id: string) {
    return await this.repository.findFirst({ where: { id } });
  }
  async findManyByIds(ids: string[]) {
    return await this.repository.findMany({ where: { id: { in: ids } } });
  }
}
