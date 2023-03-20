import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/db/prisma.service';
import {
  makePaginationHelper,
  PaginationDto,
} from 'src/common/helpers/pagination.helper';
import { CreateProductDto } from '../dto/create-product.dto';
import {
  makeWhereDescriptionAndName,
  QueryParamsDto,
} from '../dto/query-params.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductRepository {
  private repository;
  constructor(private readonly prismaService: PrismaService) {
    this.repository = this.prismaService.product;
  }

  async findById(id: string) {
    return await this.repository.findFirst({ where: { id } });
  }
  async findAll() {
    return await this.repository.findMany({});
  }
  async findAllPagineted(pagination: PaginationDto, query: QueryParamsDto) {
    const results = await this.repository.findMany({
      ...makePaginationHelper(pagination),
      where: {
        ...makeWhereDescriptionAndName(query),
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
  async create(createProductDto: CreateProductDto) {
    return await this.repository;
  }
  async update(id: string, updateProductDto: UpdateProductDto) {
    return '';
  }
  async delete(id: string) {
    return '';
  }
}
