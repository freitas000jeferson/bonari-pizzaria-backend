import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    return 'Hello World!';
  }
  healthCheck() {
    return {
      env: this.configService.get<string>('ENV') ?? 'DEV',
      date: new Date().toDateString(),
      message: `Status API OK (${this.configService.get<string>('ENV')})`,
      version: `${process.env.npm_package_version}`,
    };
  }
}
