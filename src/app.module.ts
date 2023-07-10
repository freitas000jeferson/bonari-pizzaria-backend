import { ClientModule } from './client/client.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { PrismaService } from './common/db/prisma.service';
import { Module } from '@nestjs/common';
import { MiddlewareConsumer, NestModule } from '@nestjs/common/interfaces';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueryTransformPipe } from './common/helpers/pipes/query-transform-pipe';
import { OrderModule } from './order/order.module';
import { AditionalModule } from './aditional/aditional.module';

@Module({
  imports: [
    ClientModule,
    UserModule,
    ProductModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV
        ? `./env/.env.${process.env.NODE_ENV}`
        : './env/.env.dev',
    }),
    OrderModule,
    AditionalModule,
  ],
  controllers: [AppController],
  providers: [AppService, QueryTransformPipe],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
