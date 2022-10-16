import { InvalidParamError } from "../../../presentation/errors";
import { CompareFieldsValidation } from "./compare-fields-validation";

const makeSut = () => {
  return new CompareFieldsValidation("password", "passwordConfirmation");
};

describe("CompareFieldsValidation", () => {
  test("Should return a InvalidParamError if validation fails", () => {
    const sut = makeSut();
    const error = sut.validate({
      password: "any_password",
      passwordConfirmation: "different_password",
    });
    expect(error).toEqual(new InvalidParamError("passwordConfirmation"));
  });
});
