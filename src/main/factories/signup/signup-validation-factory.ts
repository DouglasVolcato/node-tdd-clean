import { Validation } from "../../../presentation/protocols/validation";
import { EmailValidatorAdapter } from "../../adapters/validators/email-validator-adapter";
import {
  EmailValidation,
  CompareFieldsValidation,
  RequiredFieldsValidation,
  ValidationComposite,
} from "../../../presentation/helpers/validators";

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ["name", "email", "password", "passwordConfirmation"]) {
    validations.push(new RequiredFieldsValidation(field));
  }
  validations.push(
    new CompareFieldsValidation("password", "passwordConfirmation")
  );
  validations.push(new EmailValidation("email", new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};
