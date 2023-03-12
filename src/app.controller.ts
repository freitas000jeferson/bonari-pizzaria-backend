import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './common/db/prisma.service';

@Controller({
  version: '1',
})
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dbService: PrismaService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hc')
  hc() {
    return this.appService.healthCheck();
  }
  @Get('prisma')
  testDatabase() {
    return this.dbService.countOrder.create({
      data: {
        count: 0,
        date: '2023-03-05T03:00:00.000+00:00',
      },
    });
  }
}
