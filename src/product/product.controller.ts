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
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './services/product.service';

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
  async findAll() {
    return await this.productService.findAll();
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
