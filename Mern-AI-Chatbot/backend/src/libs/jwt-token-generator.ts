import { sign, SignOptions, Secret } from "jsonwebtoken";

export const createToken = (id: string, email: string, expiresIn: string) => {
  const secret = process.env.JWT_SECRET;

  //SignOptions.expiresIn uses a narrower type in the jwt types. Cast to satisfy TS.
  const options: SignOptions = {
    expiresIn: expiresIn as unknown as SignOptions["expiresIn"],
  };
  const token = sign({ id, email }, secret as Secret, options);
  return token;
};
