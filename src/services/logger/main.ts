type LogMethod = 'debug' | 'info' | 'warn' | 'error';

export type LogLevel = LogMethod | 'silent';

export type Logger = {
  debug: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
};

const LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  silent: 4,
};

let level: LogLevel = import.meta.env.DEV ? 'debug' : 'warn';

export function setLogLevel(newLevel: LogLevel): void {
  level = newLevel;
}

export function createLogger(namespace: string): Logger {
  const prefix = `[${namespace}]`;

  function emit(method: LogMethod, args: unknown[]): void {
    if (LEVELS[method] < LEVELS[level]) return;
    console[method](prefix, ...args);
  }

  return {
    debug: (...args) => emit('debug', args),
    info: (...args) => emit('info', args),
    warn: (...args) => emit('warn', args),
    error: (...args) => emit('error', args),
  };
}
