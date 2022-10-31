import { MongoHelper } from "../../../src/infra/db/mongodb/helpers/mongo-helper";
import request from "supertest";
import app from "../config/app";
import { Collection } from "mongodb";
import { hash } from "bcrypt";

let accountCollection: Collection;

describe("Login routes", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection("accounts");
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

  describe("POST /login", () => {
    test("Should return 200 on login", async () => {
      const password = await hash("password123", 12);
      await accountCollection.insertOne({
        name: "Douglas",
        email: "douglasvolato@gmail.com",
        password,
      });
      await request(app)
        .post("/api/login")
        .send({
          email: "douglasvolato@gmail.com",
          password: "password123",
        })
        .expect(200);
    });

    test("Should return 401 with invalid credentials", async () => {
      await request(app)
        .post("/api/login")
        .send({
          email: "douglasvolato@gmail.com",
          password: "password123",
        })
        .expect(401);
    });
  });
});
