import { Validation } from "../../../presentation/protocols/validation";
import { RequiredFieldsValidation } from "../../../presentation/helpers/validators/required-field-validation";
import { ValidationComposite } from "../../../presentation/helpers/validators/validationComposite";
import { makeSignUpValidation } from "./signup-validation-factory";
import { CompareFieldsValidation } from "../../../presentation/helpers/validators/compare-fields-validation";
import { EmailValidation } from "../../../presentation/helpers/validators/email-validation";
import { EmailValidator } from "../../../presentation/protocols/email-validator";

jest.mock("../../../presentation/helpers/validators/validationComposite");

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

describe("SignUpValidationFactory", () => {
  test("Should call ValidationComposite with all validations", () => {
    makeSignUpValidation();
    const validations: Validation[] = [];
    for (const field of ["name", "email", "password", "passwordConfirmation"]) {
      validations.push(new RequiredFieldsValidation(field));
    }
    validations.push(
      new CompareFieldsValidation("password", "passwordConfirmation")
    );
    validations.push(new EmailValidation("email", makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
