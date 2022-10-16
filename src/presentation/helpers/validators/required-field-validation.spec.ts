import { MissingParamError } from "../../../presentation/errors";
import { RequiredFieldsValidation } from "./required-field-validation";

const makeSut = () => {
  return new RequiredFieldsValidation("email");
};

describe("RequiredFieldsValidation", () => {
  test("Should return a MissingParamError if validation fails", () => {
    const sut = makeSut();
    const error = sut.validate({ name: "Douglas" });
    expect(error).toEqual(new MissingParamError("email"));
  });

  test("Should not return if validation succeeds", () => {
    const sut = makeSut();
    const error = sut.validate({ email: "any_email@email.com" });
    expect(error).toBeFalsy();
  });
});
