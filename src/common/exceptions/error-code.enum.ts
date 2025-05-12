import { HttpStatus } from '@nestjs/common';

export class ErrorCode {
  constructor(
    public readonly status: HttpStatus,
    public readonly code: string,
    public readonly message: string,
  ) {}

  static readonly SYS_UNAUTHORIZED = new ErrorCode(
    HttpStatus.UNAUTHORIZED,
    'S001',
    '인증에러',
  );
  static readonly SYS_JWT_EXPIRED = new ErrorCode(
    HttpStatus.UNAUTHORIZED,
    'S002',
    '토큰 만료',
  );
  static readonly SYS_ACCESS_DENIED = new ErrorCode(
    HttpStatus.FORBIDDEN,
    'S003',
    '접근 권한 없음',
  );
  static readonly SYS_NOT_FOUND_PAGE = new ErrorCode(
    HttpStatus.NOT_FOUND,
    'S004',
    '페이지를 찾을 수 없음',
  );
  static readonly SYS_METHOD_NOT_ALLOWED = new ErrorCode(
    HttpStatus.METHOD_NOT_ALLOWED,
    'S005',
    '사용 불가능 상태',
  );
  static readonly SYS_UNPROCESSABLE_ENTITY = new ErrorCode(
    HttpStatus.UNPROCESSABLE_ENTITY,
    'S006',
    'Unprocessable Entity',
  );
  static readonly SYS_INTERNAL_SERVER_ERROR = new ErrorCode(
    HttpStatus.INTERNAL_SERVER_ERROR,
    'E999',
    '요청된 처리 수행 중 오류가 발생하였습니다. 관리자에게 문의해 주세요.[☎1111]',
  );

  static readonly BIZ_INVALID_INPUT_VALUE = new ErrorCode(
    HttpStatus.BAD_REQUEST,
    'B001',
    '입력 값 에러',
  );
  static readonly BIZ_INVALID_TYPE_VALUE = new ErrorCode(
    HttpStatus.BAD_REQUEST,
    'B002',
    '입력 유형 에러',
  );
  static readonly BIZ_NOT_FOUND_DATA = new ErrorCode(
    HttpStatus.NOT_FOUND,
    'B003',
    '데이터를 찾을 수 없음',
  );
  static readonly BIZ_DUPLICATE_INPUT_INVALID = new ErrorCode(
    HttpStatus.BAD_REQUEST,
    'B004',
    '중복된 값을 입력하였습니다',
  );
  static readonly BIZ_DB_CONSTRAINT_DELETE = new ErrorCode(
    HttpStatus.BAD_REQUEST,
    'B005',
    '참조하는 데이터가 있어서 삭제할 수 없습니다',
  );
  static readonly BIZ_KEY_EXPIRED = new ErrorCode(
    HttpStatus.UNAUTHORIZED,
    'B006',
    'API KEY가 만료되었습니다.',
  );
  static readonly BIZ_INVALID_API_KEY = new ErrorCode(
    HttpStatus.UNAUTHORIZED,
    'B007',
    '유효하지 않은 API KEY 입니다.',
  );
  static readonly BIZ_CUSTOM_MESSAGE = new ErrorCode(
    HttpStatus.BAD_REQUEST,
    'B999',
    '',
  ); // 사용자 정의 메시지
}
