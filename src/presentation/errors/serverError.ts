export class ServerError extends Error {
  constructor(stack?: string) {
    super(`Interal server error`);
    this.name = "ServerError";
    this.stack = stack;
  }
}
