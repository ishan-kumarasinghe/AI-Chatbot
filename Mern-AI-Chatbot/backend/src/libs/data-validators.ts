import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

//Run Validation
export const validate = (validations: any[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length > 0) {
        break;
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(422).json({ errors: errors.array() });
  };
};

//Validation Rules
export const userSignupValidator = [
  body("name").notEmpty().withMessage("Name is empty"),
  body("email").notEmpty().isEmail().withMessage("Email is incorrect"),
  body("password")
    .isLength({ min: 6, max: 25 })
    .withMessage(
      "Minimum length of password should be between 5-25 characters"
    ),
];
