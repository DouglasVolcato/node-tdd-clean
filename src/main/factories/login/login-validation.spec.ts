import { Validation } from "../../../presentation/protocols/validation";
import { RequiredFieldsValidation } from "../../../presentation/helpers/validators/required-field-validation";
import { ValidationComposite } from "../../../presentation/helpers/validators/validationComposite";
import { EmailValidation } from "../../../presentation/helpers/validators/email-validation";
import { EmailValidator } from "../../../presentation/protocols/email-validator";
import { makeLoginValidation } from "./login-validation";

jest.mock("../../../presentation/helpers/validators/validationComposite");

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

describe("LoginValidationFactory", () => {
  test("Should call ValidationComposite with all validations", () => {
    makeLoginValidation();
    const validations: Validation[] = [];
    for (const field of ["email", "password"]) {
      validations.push(new RequiredFieldsValidation(field));
    }
    validations.push(new EmailValidation("email", makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
