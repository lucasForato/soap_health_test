class BaseError extends Error {
  protected httpCode: number;
  protected timestamp: string;

  constructor(httpCode: number, message: string) {
    super(message);
    this.httpCode = httpCode;
    this.timestamp = new Date().toString();
  }

  toObject() {
    return {
      code: this?.httpCode,
      message: this?.message,
    };
  }
}

export default BaseError;
