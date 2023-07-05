import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/db/prisma.service';

import {
  makeWhereDescriptionAndName,
  QueryParamsDto,
} from '../dto/query-params.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CreateProductDto } from './../dto/create-product.dto';
import {
  makePaginationDBHelper,
  PaginationDto,
} from 'src/common/helpers/pagination';

@Injectable()
export class ProductRepository {
  private repository;
  constructor(private readonly prismaService: PrismaService) {
    this.repository = this.prismaService.product;
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
        price: true,
        description: true,
        isEnable: true,
        category: true,
      },
    });
  }
  async findAllPagineted(pagination: PaginationDto, query: QueryParamsDto) {
    const results = await this.repository.findMany({
      ...makePaginationDBHelper(pagination),
      where: {
        ...makeWhereDescriptionAndName(query),
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        isEnable: true,
        category: true,
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
        ...makeWhereDescriptionAndName(query),
      },
    });
  }
  async createMany(listProductsDto: CreateProductDto[]) {
    const date = new Date().toISOString();
    listProductsDto.forEach((product) => {
      product.createdDate = date;
      product.updatedDate = date;
    });
    return await this.repository.createMany({ data: listProductsDto });
  }
  async create(data: CreateProductDto) {
    const date = new Date().toISOString();
    data.createdDate = date;
    data.updatedDate = date;
    return await this.repository.create({ data });
  }
  async update(id: string, data: UpdateProductDto) {
    const date = new Date().toISOString();
    data.updatedDate = date;
    return await this.repository.update({ where: { id }, data });
  }
  async delete(id: string) {
    return await this.repository.delete({ where: { id } });
  }
}
