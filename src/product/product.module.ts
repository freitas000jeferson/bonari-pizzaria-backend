import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/db/prisma.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './repositories/product.repository';
import { ProductService } from './services/product.service';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, PrismaService],
  exports: [ProductRepository, ProductService],
})
export class ProductModule {}
