import { ApiProperty } from '@nestjs/swagger';

import { ApiDefaultReponse } from './api-default-response.dto';

export class ApiSuccessResponse extends ApiDefaultReponse {
  @ApiProperty({
    description: 'Dados de retorno',
    example: null,
  })
  data: unknown;
}
