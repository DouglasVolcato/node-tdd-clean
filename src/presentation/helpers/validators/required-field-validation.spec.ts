import { MissingParamError } from "../../../presentation/errors";
import { RequiredFieldsValidation } from "./required-field-validation";

describe("RequiredFieldsValidation", () => {
  test("Should return a MissingParamError if validation fails", () => {
    const sut = new RequiredFieldsValidation("field");
    const error = sut.validate({ email: "any_email@email.com" });
    console.log(error);
    expect(error).toEqual(new MissingParamError("field"));
  });
});