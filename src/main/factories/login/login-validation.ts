import { Validation } from "../../../presentation/protocols/validation";
import { RequiredFieldsValidation } from "../../../presentation/helpers/validators/required-field-validation";
import { ValidationComposite } from "../../../presentation/helpers/validators/validationComposite";
import { EmailValidatorAdapter } from "../../../utils/email-validator-adapter";
import { EmailValidation } from "../../../presentation/helpers/validators/email-validation";

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ["email", "password"]) {
    validations.push(new RequiredFieldsValidation(field));
  }
  validations.push(new EmailValidation("email", new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};
