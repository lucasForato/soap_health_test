import { HttpException, HttpStatus } from '@nestjs/common';

type ErrorDescription = {
  code: number;
  message: string[];
  error: string;
};

export default class Exception extends HttpException {
  constructor(error: ErrorDescription) {
    super(
      { message: error.message, error: error.error, code: error.code },
      error.code,
    );
  }
}

export class DatabaseException extends Exception {
  constructor(message: string) {
    super({
      message: [message],
      error: 'Bad Request',
      code: HttpStatus.BAD_REQUEST,
    });
  }
}

export class EntityException extends Exception {
  constructor(message: string) {
    super({
      message: [message],
      error: 'Bad Request',
      code: HttpStatus.BAD_REQUEST,
    });
  }
}
