import { Validation } from "../../presentation/helpers/validators/validation";
import { RequiredFieldsValidation } from "../../presentation/helpers/validators/required-field-validation";
import { ValidationComposite } from "../../presentation/helpers/validators/validationComposite";
import { makeSignUpValidation } from "./signup-validation";
import { CompareFieldsValidation } from "../../presentation/helpers/validators/compare-fields-validation";

jest.mock("../../presentation/helpers/validators/validationComposite");

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
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
