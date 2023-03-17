import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiErrorResponse extends HttpException {
  constructor(response = '', httpStatus = HttpStatus.INTERNAL_SERVER_ERROR) {
    // errors = null // stack = '', // isOperational = true, // status = 'internal-server-error', // message: string,
    super(response, httpStatus);
  }
  // constructor(httpStatus = HttpStatus.INTERNAL_SERVER_ERROR) {
  //   super(httpStatus);
  // }
}
