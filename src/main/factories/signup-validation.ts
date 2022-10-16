import { Validation } from "../../presentation/helpers/validators/validation";
import { RequiredFieldsValidation } from "../../presentation/helpers/validators/required-field-validation";
import { ValidationComposite } from "../../presentation/helpers/validators/validationComposite";

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ["name", "email", "password", "passwordConfirmation"]) {
    validations.push(new RequiredFieldsValidation(field));
  }
  return new ValidationComposite(validations);
};
