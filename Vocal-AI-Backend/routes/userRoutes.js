import express from "express";
import { signUpUser, loginUser } from "../controllers/userController.js";
import {
  signupValidation,
  loginValidation,
} from "../middlewares/validators/userValidators.js";
import { validate } from "../middlewares/validators/validate.js";

const router = express.Router();

router.post("/signup", signupValidation, validate, signUpUser);
router.post("/login", loginValidation, validate, loginUser); // Optional: add `loginValidation` if created

export default router;
