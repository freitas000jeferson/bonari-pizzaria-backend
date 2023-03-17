import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/db/prisma.service';
import { CreateProductDto } from '../dto/create-product.dto';
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
    return await this.repository.findMany();
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
