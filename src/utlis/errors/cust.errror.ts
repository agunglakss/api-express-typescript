export class CustError extends Error {
  public readonly httpCode: number;

  constructor(message: string, httpCode: number, cause?: unknown) {
    super(message)
    this.cause = cause
    this.httpCode = httpCode
  }
}
