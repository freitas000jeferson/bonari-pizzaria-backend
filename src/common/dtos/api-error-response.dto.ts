import { ApiDefaultReponse } from './api-default-response.dto';

class ApiErrorResponseData {
  httpCode: string;
  message: string;
  details: string[];
}

export class ApiErrorResponse extends ApiDefaultReponse {
  error: ApiErrorResponseData;
}
