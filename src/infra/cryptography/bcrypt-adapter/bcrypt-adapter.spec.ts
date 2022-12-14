import bcrypt, { compare } from "bcrypt";
import { BcryptAdapter } from "./bcrypt-adapter";

jest.mock("bcrypt", () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve("hash"));
  },
  async compare(): Promise<boolean> {
    return new Promise((resolve) => resolve(true));
  },
}));

const makeSut = (salt: number) => {
  return new BcryptAdapter(salt);
};

describe("Bcrypt Adapter", () => {
  test("Should call hash with correct values", async () => {
    const salt = 12;
    const sut = makeSut(salt);
    const hashSpy = jest.spyOn(bcrypt, "hash");
    await sut.hash("any_value");
    expect(hashSpy).toHaveBeenCalledWith("any_value", salt);
  });

  test("Should return a valid hash on success", async () => {
    const salt = 12;
    const sut = makeSut(salt);
    const hash = await sut.hash("any_value");
    expect(hash).toBe("hash");
  });

  test("Should throw if hash throws", async () => {
    const salt = 12;
    const sut = makeSut(salt);
    jest
      .spyOn(sut, "hash")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const promise = sut.hash("any_value");
    expect(promise).rejects.toThrow();
  });

  test("Should call compare with correct values", async () => {
    const salt = 12;
    const sut = makeSut(salt);
    const compareSpy = jest.spyOn(bcrypt, "compare");
    await sut.compare("any_value", "any_hash");
    expect(compareSpy).toHaveBeenCalledWith("any_value", "any_hash");
  });

  test("Should return true when compare succeeds", async () => {
    const salt = 12;
    const sut = makeSut(salt);
    const isValid = await sut.compare("any_value", "any_hash");
    expect(isValid).toBe(true);
  });

  test("Should return false when compare fails", async () => {
    const salt = 12;
    const sut = makeSut(salt);
    const compareSpy = jest
      .spyOn(bcrypt, "compare")
      .mockImplementation(() => Promise.resolve(false));
    const isValid = await sut.compare("any_value", "any_hash");
    expect(isValid).toBe(false);
  });

  test("Should throw if compare throws", async () => {
    const salt = 12;
    const sut = makeSut(salt);
    jest
      .spyOn(sut, "compare")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const promise = sut.compare("any_value", "any_hash");
    expect(promise).rejects.toThrow();
  });
});
