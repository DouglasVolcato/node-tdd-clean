import { HashComparer } from "@/data/protocols/criptography/hash-comparer";
import { TokenGenerator } from "@/data/protocols/criptography/token-generator";
import { LoadAccountByEmailRepository } from "@/data/protocols/db/load-account-by-email-repository";
import {
  Authentication,
  AuthenticationModel,
} from "../../../../domain/usecases/authentication";

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;
  hashComparer: HashComparer;
  tokenGenerator: TokenGenerator;

  constructor(
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashComparer: HashComparer,
    tokenGenerator: TokenGenerator
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.hashComparer = hashComparer;
    this.tokenGenerator = tokenGenerator;
  }

  async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(
      authentication.email
    );
    if (account) {
      const isValid = await this.hashComparer.compare(
        authentication.password,
        account.password
      );
      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id);
        return accessToken;
      }
    }
    return null;
  }
}