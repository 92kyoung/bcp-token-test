import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from './error-code.enum';

export class BusinessException extends HttpException {
  constructor(errorCode: ErrorCode, customMessage?: string) {
    super(customMessage ?? errorCode.message, errorCode.status);
  }
}
