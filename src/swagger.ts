import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function SetupSwagger(app: INestApplication): any {
  const options = new DocumentBuilder()
    .setTitle('Bonari Pizzaria')
    .setDescription('Serviço de compras - Bonari Pizzaria')
    .setVersion('1')
    .addServer('http://localhost:3000/api/v1/', 'DEV')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'x-client-auth'
    )
    .addBasicAuth(undefined, 'x-client-key')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}
