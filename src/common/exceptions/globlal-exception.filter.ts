import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch() //예외 발생시 자동으로 필터 실행
export class GlobalExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost; //응답 객체에 접근하기 위함
    const ctx = host.switchToHttp();

    // 상태 코드 추출 (HttpException일 경우)
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorMessage = 'Unknown error';

    // 예외가 HttpException일 경우, getResponse()가 string 또는 object일 수 있으므로 구분하여 처리
    // if (exception instanceof BadRequestException) {
    //   const response = exception.getResponse();
    //   let message = '유효성 검증이 실패하였습니다.\n';

    //   if (typeof response === 'object' && response !== null) {
    //     if (Array.isArray(response['message'])) {
    //       response['message'].forEach((errorMsg) => {
    //         message += `- ${errorMsg}\n`;
    //       });
    //     } else if (typeof response['message'] === 'string') {
    //       message += `- ${response['message']}\n`;
    //     }
    //   } else if (typeof response === 'string') {
    //     message += `- ${response}\n`;
    //   }

    //   errorMessage = message;
    // } else 
    
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      // 만약 response가 string이라면 바로 메시지로 사용
      if (typeof response === 'string') {
        errorMessage = response;
      } else if (
        typeof response === 'object' &&
        Array.isArray(response['message'])
      ) {
        // message가 배열인 경우, 이를 합쳐서 하나의 문자열로 변환
        errorMessage = response['message'].join(', '); // 배열을 쉼표로 구분하여 문자열로 결합
      } else if (typeof response === 'object' && response['message']) {
        // message가 단일 문자열인 경우
        errorMessage = response['message'];
      }
    }

    // 커스텀 응답 형식
    const responseBody = {
      code: Code.ERROR,
      message: errorMessage, // 배열이 아닌 문자열로 메시지 제공
      data: null,
    };

    // 클라이언트에게 응답 전송
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

enum Code {
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
}