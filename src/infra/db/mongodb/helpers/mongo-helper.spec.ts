import { MongoHelper as sut } from "./mongo-helper";

describe("Mongo Helper", () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await sut.disconnect();
  });

  test("Should reconnect if mongodb is down", async () => {
    let accountColection = await sut.getCollection("account");
    expect(accountColection).toBeTruthy();
    await sut.disconnect();
    accountColection = await sut.getCollection("account");
    expect(accountColection).toBeTruthy();
  });
});
