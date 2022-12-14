import { DbAuthentication } from "../../../data/usecases/add-account/authentication/db-authentication";
import { BcryptAdapter } from "../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter";
import { JwtAdapter } from "../../../infra/cryptography/jwt-adapter/jwt-adapter";
import { AccountMongoRepository } from "../../../infra/db/mongodb/account/account-repository";
import { LogMongoRepository } from "../../../infra/db/mongodb/log-repository/log";
import env from "../../../main/config/env";
import { LogControllerDecorator } from "../../../main/decorators/log-controller-decorator";
import { LoginController } from "../../../presentation/controllers/login/login-controller";
import { Controller } from "../../../presentation/protocols";
import { makeLoginValidation } from "./login-validation-factory";

export const makeLoginController = (): Controller => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  );
  const validation = makeLoginValidation();
  const loginController = new LoginController(dbAuthentication, validation);
  const logMongoRepository = new LogMongoRepository();

  return new LogControllerDecorator(loginController, logMongoRepository);
};
