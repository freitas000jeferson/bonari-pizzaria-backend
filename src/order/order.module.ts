import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './repositories/order.repository';
import { PrismaService } from 'src/common/db/prisma.service';
import { AditionalModule } from 'src/aditional/aditional.module';
import { ProductModule } from './../product/product.module';

@Module({
  imports: [AditionalModule, ProductModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, PrismaService],
})
export class OrderModule {}
