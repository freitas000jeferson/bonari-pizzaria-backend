import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ApiSuccessResponse } from 'src/common/dtos/api-success-response.dto';
import { exceptionMessages } from 'src/common/exceptions/exceptions-messages';
import { CreateProductDto } from '../dto/create-product.dto';
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
    return '';
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
