export class RestError extends Error {
  constructor(
    message: string,
    readonly status: number | null,
    readonly body: string | null,
  ) {
    super(message);
    this.name = 'RestError';
  }
}

export class NetworkError extends RestError {
  constructor(message: string) {
    super(message, null, null);
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends RestError {
  constructor(timeout: number) {
    super(`Request timed out after ${timeout}ms`, null, null);
    this.name = 'TimeoutError';
  }
}

export class HttpError extends RestError {
  constructor(status: number, statusText: string, body: string | null) {
    super(statusText, status, body);
    this.name = 'HttpError';
  }
}

export class ParseError extends RestError {
  constructor(status: number, body: string) {
    super('Failed to parse response as JSON', status, body);
    this.name = 'ParseError';
  }
}
