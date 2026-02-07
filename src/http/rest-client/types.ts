import type { RestError } from './errors';

export type RetryConfig = {
  attempts: number;
  baseDelay: number;
};

export type RestClientProps = {
  baseUrl: string;
  headers?: Record<string, string>;
  timeout?: number;
  retry?: Partial<RetryConfig>;
};

export type RequestOptions = {
  headers?: Record<string, string>;
  timeout?: number;
  signal?: AbortSignal;
  retry?: Partial<RetryConfig>;
};

export type RestResult<T> = RestSuccess<T> | RestFailure;

export type RestSuccess<T> = {
  ok: true;
  status: number;
  data: T;
  headers: Headers;
};

export type RestFailure = {
  ok: false;
  error: RestError;
};

export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};
