import { MongoHelper } from "../helpers/mongo-helper";
import { Collection } from "mongodb";
import { AccountMongoRepository } from "./account-repository";
import env from "../../../../main/config/env";

let accountCollection: Collection;

describe("Account Mongo Repository", () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection("accounts");
    await accountCollection.deleteMany({});
  });

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository();
  };

  test("Should return an account on add success", async () => {
    const sut = makeSut();
    const account = await sut.add({
      name: "any_name",
      email: "any_email@email.com",
      password: "any_password",
    });
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe("any_name");
    expect(account.email).toBe("any_email@email.com");
    expect(account.password).toBe("any_password");
  });

  test("Should return an account on loadByRmail success", async () => {
    const sut = makeSut();
    await accountCollection.insertOne({
      name: "any_name",
      email: "any_email@email.com",
      password: "any_password",
    });
    const account = await sut.loadByEmail("any_email@email.com");
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe("any_name");
    expect(account.email).toBe("any_email@email.com");
    expect(account.password).toBe("any_password");
  });

  test("Should return null if loadByEmail fails", async () => {
    const sut = makeSut();
    const account = await sut.loadByEmail("any_email@email.com");
    expect(account).toBeFalsy();
  });

  test("Should update the account accessToken on updateAccountAccessToken success", async () => {
    const sut = makeSut();
    const res = await accountCollection.insertOne({
      name: "any_name",
      email: "any_email@email.com",
      password: "any_password",
    });
    const fakeAccount = res.ops[0];
    expect(fakeAccount.accessToken).toBeFalsy();
    await sut.updateAccessToken(fakeAccount._id, "any_token");
    const account = await accountCollection.findOne({ _id: fakeAccount._id });
    expect(account).toBeTruthy();
    expect(account.accessToken).toBe("any_token");
  });
});
