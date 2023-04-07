import { PrismaService } from './../../common/db/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './../dto/create-order.dto';
import { Order } from './../../common/entities/order.entity';

@Injectable()
export class OrderRepository {
  private repository;
  constructor(private readonly prismaService: PrismaService) {
    this.repository = this.prismaService.order;
  }
  async create(createOrderDto: Order) {
    return await this.repository.create({ data: createOrderDto });
  }
  async getById(id: string) {
    return await this.repository.findFirst({ where: { id } });
  }
}
