import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

import { SetupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.use(helmet());
  app.enableCors();

  const prefix = configService.get<string>('API_PREFIX');
  app.setGlobalPrefix(prefix ? prefix : '');

  if (configService.get<string>('API_SWAGGER_ENABLE') === '1') {
    SetupSwagger(app);
  }

  const PORT = configService.get<string>('API_PORT') ?? 3000;
  await app.listen(PORT);
}
bootstrap();
