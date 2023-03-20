import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { sign } from 'crypto';
import { ApiSuccessResponse } from 'src/common/dtos/api-success-response.dto';
import { exceptionMessages } from 'src/common/exceptions/exceptions-messages';
import { PaginationDto } from 'src/common/helpers/pagination.helper';
import { CreateProductDto } from '../dto/create-product.dto';
import { QueryParamsDto } from '../dto/query-params.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findById(id: string) {
    try {
      const data = await this.productRepository.findById(id);
      if (!data) {
        throw new NotFoundException(exceptionMessages.notFound('product'));
      }
      return plainToClass(ApiSuccessResponse, { data });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async findAll() {
    return await this.productRepository.findAll();
  }
  async findAllPaginated(pagination: PaginationDto, query: QueryParamsDto) {
    const { results, totalItems } =
      await this.productRepository.findAllPagineted(pagination, query);
    const size: number = Number(pagination.size!);
    const totalPages = Math.ceil(totalItems / size!) - 1;
    const currentPage = Number(pagination.page);
    return plainToClass(ApiSuccessResponse, {
      data: results,
      pagination: {
        length: totalItems,
        size: size,
        lastPage: totalPages,
        page: currentPage,
        startIndex: currentPage * size,
        endIndex: currentPage * size + (size + 1),
      },
    });
  }
  async create(createProductDto: CreateProductDto) {
    return '';
  }
  async update(id: string, updateProductDto: UpdateProductDto) {
    return '';
  }
  async delete(id: string) {
    return '';
  }
}
