export class ServerError extends Error {
  constructor() {
    super(`Interal server error`);
    this.name = "ServerError";
  }
}
