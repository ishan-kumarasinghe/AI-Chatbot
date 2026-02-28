import jwt from "jsonwebtoken";
export const createToken = (id, email, expiresIn) => {
    const secret = process.env.JWT_SECRET;
    //SignOptions.expiresIn uses a narrower type in the jwt types. Cast to satisfy TS.
    const options = {
        expiresIn: expiresIn,
    };
    const token = jwt.sign({ id, email }, secret, options);
    return token;
};
//# sourceMappingURL=jwt-token-generator.js.map