import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/db/prisma.service';
import {
  PaginationDto,
  makePaginationDBHelper,
} from 'src/common/helpers/pagination';
import {
  UserQueryParamsDto as QueryParamsDto,
  makeWhereEmailAndPhoneNumber,
} from '../dto/user-query-params.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository {
  private repository;
  constructor(private readonly prismaService: PrismaService) {
    this.repository = this.prismaService.user;
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
        role: true,
        isEnable: true,
      },
    });
  }
  async findAllPagineted(pagination: PaginationDto, query: QueryParamsDto) {
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
  async count(query: QueryParamsDto) {
    return await this.repository.count({
      where: {
        ...makeWhereEmailAndPhoneNumber(query),
      },
    });
  }
  async find(query: QueryParamsDto) {
    return await this.repository.findFirst({
      where: { ...makeWhereEmailAndPhoneNumber(query) },
    });
  }
  async create(data: CreateUserDto) {
    const date = new Date().toISOString();
    data.createdDate = date;
    data.updatedDate = date;
    return await this.repository.create({ data });
  }
  async update(id: string, data: UpdateUserDto) {
    const date = new Date().toISOString();
    data.updatedDate = date;
    return await this.repository.update({ where: { id }, data });
  }
  async delete(id: string) {
    return await this.repository.delete({ where: { id } });
  }
}
