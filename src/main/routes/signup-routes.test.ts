import request from "supertest";
import app from "../config/app";

describe("SignUp routes", () => {
  test("Should return an account on success", async () => {
    await request(app)
      .post("/api/signup")
      .send({
        name: "Douglas",
        email: "douglasvolato@gmail.com",
        password: "password123",
      })
      .expect(200);
  });
});
