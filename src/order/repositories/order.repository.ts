import { PrismaService } from './../../common/db/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderRepository {
  private repository;
  constructor(private readonly prismaService: PrismaService) {
    this.repository = this.prismaService.order;
  }
  create() {
    return {};
  }
  async getById(id: string) {
    return await this.repository.findFirst({ where: { id } });
  }
}
