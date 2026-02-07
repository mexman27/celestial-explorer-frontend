import type {
  RestClientProps,
  RequestOptions,
  RestResult,
  RestFailure,
  RetryConfig,
  PaginatedResponse,
} from './types';
import { NetworkError, TimeoutError, HttpError, ParseError } from './errors';

const DEFAULT_TIMEOUT = 30_000;

const DEFAULT_RETRY: RetryConfig = {
  attempts: 3,
  baseDelay: 1000,
};

export class RestClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;
  private defaultTimeout: number;
  private defaultRetry: RetryConfig;

  constructor({ baseUrl, headers, timeout, retry }: RestClientProps) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = headers ?? {};
    this.defaultTimeout = timeout ?? DEFAULT_TIMEOUT;
    this.defaultRetry = { ...DEFAULT_RETRY, ...retry };
  }

  get<T>(path: string, options?: RequestOptions): Promise<RestResult<T>> {
    return this.request('GET', path, undefined, options);
  }

  post<T>(path: string, body: unknown, options?: RequestOptions): Promise<RestResult<T>> {
    return this.request('POST', path, body, options);
  }

  put<T>(path: string, body: unknown, options?: RequestOptions): Promise<RestResult<T>> {
    return this.request('PUT', path, body, options);
  }

  patch<T>(path: string, body: unknown, options?: RequestOptions): Promise<RestResult<T>> {
    return this.request('PATCH', path, body, options);
  }

  delete<T>(path: string, options?: RequestOptions): Promise<RestResult<T>> {
    return this.request('DELETE', path, undefined, options);
  }

  async *paginate<T>(
    path: string,
    options?: RequestOptions,
  ): AsyncGenerator<RestResult<PaginatedResponse<T>>> {
    let url: string | null = this.baseUrl + path;

    while (url) {
      const result: RestResult<PaginatedResponse<T>> = await this.requestUrl('GET', url, undefined, options);

      yield result;

      if (!result.ok) return;
      url = result.data.next;
    }
  }

  private async request<T>(
    method: string,
    path: string,
    body: unknown | undefined,
    options: RequestOptions | undefined,
  ): Promise<RestResult<T>> {
    return this.requestUrl(method, this.baseUrl + path, body, options);
  }

  private async requestUrl<T>(
    method: string,
    url: string,
    body: unknown | undefined,
    options: RequestOptions | undefined,
  ): Promise<RestResult<T>> {
    const headers: Record<string, string> = { ...this.defaultHeaders, ...options?.headers };
    const timeout = options?.timeout ?? this.defaultTimeout;
    const retry: RetryConfig = { ...this.defaultRetry, ...options?.retry };

    if (body !== undefined && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    const serializedBody = body !== undefined
      ? (typeof body === 'string' ? body : JSON.stringify(body))
      : undefined;

    let lastError: RestFailure | null = null;

    for (let attempt = 0; attempt < retry.attempts; attempt++) {
      if (attempt > 0) {
        await this.delay(retry.baseDelay * Math.pow(2, attempt - 1));
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const onExternalAbort = () => controller.abort();
      options?.signal?.addEventListener('abort', onExternalAbort);

      try {
        const response = await fetch(url, {
          method,
          headers,
          body: serializedBody,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const responseBody = await response.text().catch(() => null);
          lastError = {
            ok: false,
            error: new HttpError(response.status, response.statusText, responseBody),
          };

          if (response.status >= 500) continue;
          return lastError;
        }

        const text = await response.text();

        try {
          const data = JSON.parse(text) as T;
          return { ok: true, status: response.status, data, headers: response.headers };
        } catch {
          return { ok: false, error: new ParseError(response.status, text) };
        }
      } catch (err) {
        clearTimeout(timeoutId);

        if (options?.signal?.aborted) {
          return { ok: false, error: new NetworkError('Request aborted') };
        }

        if (controller.signal.aborted) {
          lastError = { ok: false, error: new TimeoutError(timeout) };
          continue;
        }

        lastError = {
          ok: false,
          error: new NetworkError(err instanceof Error ? err.message : 'Network error'),
        };
        continue;
      } finally {
        options?.signal?.removeEventListener('abort', onExternalAbort);
      }
    }

    return lastError!;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
