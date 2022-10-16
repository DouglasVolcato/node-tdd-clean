import { Validation } from "../../presentation/helpers/validators/validation";
import { RequiredFieldsValidation } from "../../presentation/helpers/validators/required-field-validation";
import { ValidationComposite } from "../../presentation/helpers/validators/validationComposite";
import { CompareFieldsValidation } from "../../presentation/helpers/validators/compare-fields-validation";

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ["name", "email", "password", "passwordConfirmation"]) {
    validations.push(new RequiredFieldsValidation(field));
  }
  validations.push(
    new CompareFieldsValidation("password", "passwordConfirmation")
  );
  return new ValidationComposite(validations);
};
