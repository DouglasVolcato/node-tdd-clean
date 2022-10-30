import { AddAccountRepository } from "@/data/protocols/db/addAccountRepository";
import { LoadAccountByEmailRepository } from "@/data/protocols/db/load-account-by-email-repository";
import { AccountModel } from "@/domain/models/account";
import { AddAccountModel } from "@/domain/usecases/add-account";
import { MongoHelper } from "../helpers/mongo-helper";

export class AccountMongoRepository
  implements AddAccountRepository, LoadAccountByEmailRepository
{
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection("accounts");
    const result = await accountCollection.insertOne(accountData);
    const account = result.ops[0];
    return MongoHelper.map(account);
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection("accounts");
    const account = await accountCollection.findOne({ email });
    return account && MongoHelper.map(account);
  }
}
