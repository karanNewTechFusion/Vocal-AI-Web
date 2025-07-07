// middlewares/validators/userValidators.js
import { body } from "express-validator";

export const signupValidation = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars"),
  body("name").notEmpty().withMessage("Name is required"),
];

export const loginValidation = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password is required"),
];
