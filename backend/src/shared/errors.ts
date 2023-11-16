import { HttpException, HttpStatus } from '@nestjs/common';

type ErrorDescription = {
  code: number;
  message: string;
};

export default class Exception extends HttpException {
  constructor(error: ErrorDescription) {
    super(error.message, error.code);
  }
}

export class DatabaseException extends Exception {
  constructor(message: string) {
    super({ message, code: HttpStatus.BAD_REQUEST });
  }
}

export class EntityException extends Exception {
  constructor(message: string) {
    super({ message, code: HttpStatus.BAD_REQUEST });
  }
}
