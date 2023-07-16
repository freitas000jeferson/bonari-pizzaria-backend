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
import { ProductQueryParamsDto } from './dto/product-query-params.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './services/product.service';
import { PaginationDto } from './../common/helpers/pagination';
import { CreateManyProducts } from './dto/create-many-products';

@Controller({ path: 'products', version: '1' })
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get('aditional')
  findAllAditional() {
    return [];
  }
  @Get('all')
  async findAll() {
    return await this.productService.findAll();
  }

  @Get()
  async findAllPaginate(
    @Query(new QueryTransformPipe()) pagination: PaginationDto,
    @Query(new QueryTransformPipe()) query: ProductQueryParamsDto
  ) {
    return await this.productService.findAllPaginated(pagination, query);
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }
  @Post('many')
  async createMany(@Body() listCreateProductDto: CreateManyProducts) {
    return await this.productService.createMany(listCreateProductDto.data);
  }
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.productService.findById(id);
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
