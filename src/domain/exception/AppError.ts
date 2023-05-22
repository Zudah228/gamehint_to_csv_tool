export type AppErrorName = "challonge" | "invalid" | "unknown";

/**
 * エラー型
 */
export class AppError implements Error {
  constructor({
    name,
    message,
    stack,
    cause,
  }: {
    name: AppErrorName;
    message: string;
    stack?: string | undefined;
    cause?: Error | undefined;
  }) {
    this.name = name;
    this.message = message;
    this.stack = stack;
    this.cause = cause;
  }
  name: AppErrorName;
  message: string;
  stack?: string | undefined;
  cause?: Error | undefined;
}
