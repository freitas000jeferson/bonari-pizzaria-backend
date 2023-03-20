import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { QueryTransformPipe } from 'src/common/helpers/pipes/query-transform-pipe';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './services/product.service';
import { PaginationDto } from './../common/helpers/pagination.helper';
import { query } from 'express';

@Controller({ path: 'products', version: '1' })
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get('aditional')
  findAllAditional() {
    return [];
  }
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.productService.findById(id);
  }
  @Get()
  async findAll(
    @Query(new QueryTransformPipe()) pagination: PaginationDto,
    @Query(new QueryTransformPipe()) query: QueryParamsDto
  ) {
    return await this.productService.findAllPaginated(pagination, query);
  }
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return await this.productService.update(id, updateProductDto);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return await this.productService.delete(id);
  }
}
