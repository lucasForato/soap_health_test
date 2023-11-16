export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public _error?: T;
  private _value?: T;

  public constructor(isSuccess: boolean, value?: T, error?: T) {
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error',
      );
    }
    if (!isSuccess && !error) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message',
      );
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this._error = error;
    this._value = value;

    Object.freeze(this);
  }

  get error() {
    return this._error;
  }

  get value() {
    return this._value;
  }

  public getValue(): T {
    if (this.isFailure) {
      throw new Error(
        "Can't get the value of an error result. Use 'getError' instead.",
      );
    }

    return this._value as T;
  }

  public getError(): T {
    if (this.isSuccess) {
      throw new Error(
        "Can't get the error of a success result. Use 'getValue' instead.",
      );
    }
    return this.error as T;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, value);
  }

  public static fail<U>(error: any): Result<U> {
    return new Result<U>(false, undefined, error);
  }
}
