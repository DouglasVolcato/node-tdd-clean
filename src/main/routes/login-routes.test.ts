import { MongoHelper } from "../../../src/infra/db/mongodb/helpers/mongo-helper";
import request from "supertest";
import app from "../config/app";

describe("Login routes", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection("accounts");
    await accountCollection.deleteMany({});
  });

  describe("POST /signup", () => {
    test("Should return 200 on signup", async () => {
      await request(app)
        .post("/api/signup")
        .send({
          name: "Douglas",
          email: "douglasvolato@gmail.com",
          password: "password123",
          passwordConfirmation: "password123",
        })
        .expect(200);
    });
  });
});