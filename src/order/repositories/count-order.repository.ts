import { PrismaService } from '../../common/db/prisma.service';
import { Injectable } from '@nestjs/common';
import { CountOrder } from './../../common/entities/count-order.entity';

@Injectable()
export class CountOrderRepository {
  private repository;
  constructor(private readonly prismaService: PrismaService) {
    this.repository = this.prismaService.countOrder;
  }
  async create(data: CountOrder) {
    return await this.repository.create({ data });
  }
  async getByDate(date: Date | string) {
    return await this.repository.findFirst({ where: { date } });
  }

  async update(id: string, data: CountOrder) {
    return await this.repository.update({ where: { id }, data });
  }
}
