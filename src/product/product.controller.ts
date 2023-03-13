import { Controller, Get, Post } from '@nestjs/common';

@Controller('products')
export class ProductController {
  @Get()
  findAllProducts() {
    return [];
  }
  @Get('aditional')
  findAllAditional() {
    return [];
  }

  @Post()
  createProduct() {
    return {};
  }
}
