import { Authentication } from "../../../domain/usecases/authentication";
import {
  InvalidParamError,
  MissingParamError,
} from "../../../presentation/errors";
import {
  badRequest,
  serverError,
} from "../../../presentation/helpers/http-helper";
import { Controller } from "../../protocols/controller";
import {
  EmailValidator,
  HttpRequest,
  HttpResponse,
} from "../signup/signup-protocols";

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly authentication: Authentication;

  constructor(emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator;
    this.authentication = authentication;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body;
      if (!email) {
        return new Promise((resolve) =>
          resolve(badRequest(new MissingParamError("email")))
        );
      } else if (!password) {
        return new Promise((resolve) =>
          resolve(badRequest(new MissingParamError("password")))
        );
      }
      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return new Promise((resolve) =>
          resolve(badRequest(new InvalidParamError("email")))
        );
      }
      this.authentication.auth(email, password);
    } catch (err) {
      return serverError(err);
    }
  }
}
