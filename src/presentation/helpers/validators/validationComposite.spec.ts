import { ValidationComposite } from "./validationComposite";
import { Validation } from "./validation";
import { MissingParamError } from "../../../presentation/errors";

const makeValidation = () => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return new MissingParamError("field");
    }
  }
  return new ValidationStub();
};

const makeSut = (): ValidationComposite => {
  const validations: Validation[] = [makeValidation()];
  return new ValidationComposite(validations);
};

describe("ValidationComposite", () => {
  test("Should return an error if any validation fails", () => {
    const sut = makeSut();
    const error = sut.validate({ field: "any_field" });
    expect(error).toEqual(new MissingParamError("field"));
  });
});
