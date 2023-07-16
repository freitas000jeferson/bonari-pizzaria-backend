import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/db/prisma.service';
import {
  PaginationDto,
  makePaginationDBHelper,
} from 'src/common/helpers/pagination';
import {
  ClientQueryParamsDto,
  makeWhereEmailAndPhoneNumber,
} from '../dto/client-query-params.dto';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';

@Injectable()
export class ClientRepository {
  private repository;
  constructor(private readonly prismaService: PrismaService) {
    this.repository = this.prismaService.client;
  }

  async findById(id: string) {
    return await this.repository.findFirst({ where: { id } });
  }
  async findManyByIds(ids: string[]) {
    return await this.repository.findMany({ where: { id: { in: ids } } });
  }

  async findAll() {
    return await this.repository.findMany({
      select: {
        id: true,
        name: true,
        phoneNumber: true,
        email: true,
        addresses: true,
      },
    });
  }
  async findAllPagineted(
    pagination: PaginationDto,
    query: ClientQueryParamsDto
  ) {
    const results = await this.repository.findMany({
      ...makePaginationDBHelper(pagination),
      where: {
        ...makeWhereEmailAndPhoneNumber(query),
      },
      select: {
        id: true,
        name: true,
        phoneNumber: true,
        email: true,
        role: true,
        isEnable: true,
      },
    });
    const totalItems = await this.count(query);

    return {
      results,
      totalItems,
    };
  }
  async count(query: ClientQueryParamsDto) {
    return await this.repository.count({
      where: {
        ...makeWhereEmailAndPhoneNumber(query),
      },
    });
  }
  async find(query: ClientQueryParamsDto) {
    return await this.repository.findFirst({
      where: { ...makeWhereEmailAndPhoneNumber(query) },
    });
  }
  async create(data: CreateClientDto) {
    const date = new Date().toISOString();
    data.createdDate = date;
    data.updatedDate = date;
    return await this.repository.create({ data });
  }
  async update(id: string, data: UpdateClientDto) {
    const date = new Date().toISOString();
    data.updatedDate = date;
    return await this.repository.update({ where: { id }, data });
  }
  async delete(id: string) {
    return await this.repository.delete({ where: { id } });
  }
}
