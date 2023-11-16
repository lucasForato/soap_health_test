import BaseError from './BaseError';
import { StatusCodes } from 'http-status-codes';

type ErrorDescription = {
  code: number;
  message: string;
};

export default class Exception extends BaseError {
  constructor(error: ErrorDescription) {
    super(error.code, error.message);
  }
}

export const errors: { [k: string]: ErrorDescription } = {};
