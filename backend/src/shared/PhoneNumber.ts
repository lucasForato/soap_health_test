import { Result } from './Result';
import { EntityException } from './errors';

export class PhoneNumber {
  protected value: string;

  constructor(value: string) {
    this.value = value;
  }

  static create(input: string): Result<PhoneNumber> | Result<Error> {
    if (!PhoneNumber.validate(input))
      return Result.fail<Error>(
        new EntityException(
          'Invalid phone number, it must contain only digits',
        ),
      );

    return Result.ok(new PhoneNumber(input));
  }

  static validate(input: string): boolean {
    const regex = /^\+?[1-9]\d{1,14}$/;
    return regex.test(input);
  }

  toString(): string {
    return this.value;
  }
}
