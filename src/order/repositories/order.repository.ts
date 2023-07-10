import { PrismaService } from './../../common/db/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './../dto/create-order.dto';
import { Order } from './../../common/entities/order.entity';
import getCurrentDate from 'src/common/helpers/date/get-current-date';
import { query } from 'express';
import {
  OrderQueryParamsDto,
  makeWhereOrder,
} from '../dto/order-query-params.dto';
import { MongoOperatorEnum } from 'src/common/constants/mongo-operator-enum';

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
    return await this.repository.findFirst({
      where: { id },
      include: { client: true },
    });
  }

  async findByCurrentDateOrWhere(query?: OrderQueryParamsDto) {
    return await this.repository.findMany({
      orderBy: { startDate: 'asc' },
      where: query
        ? makeWhereOrder(query)
        : {
            startDate: {
              gte: getCurrentDate(),
            },
          },
      select: {
        id: true,
        orderId: true,
        clientId: true,
        isDelivery: true,
        status: true,
        updateDate: true,
        total: true,
      },
    });
  }
  async count(query: OrderQueryParamsDto) {
    return await this.repository.count({
      where: {
        ...makeWhereOrder(query),
      },
    });
  }
}
