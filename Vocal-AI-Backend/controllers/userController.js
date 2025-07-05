
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { sendResponse } from '../utility/responseHelper.js';
import { generateToken } from '../utility/jwt.js';


// Signup Controller

export const signUpUser = async (req, res) => {
  const { email, password, name } = req.body;
  const emailNormalized = email.trim().toLowerCase();

  try {
    const existingUser = await User.findOne({ email: emailNormalized });
    if (existingUser) {
      return sendResponse(res, false, 409, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email: emailNormalized,
      password: hashedPassword,
      name: name || '',
    });

    const token = generateToken({ id: newUser._id });

    return sendResponse(res, true, 201, "User registered successfully", {
      user: {
        _id: newUser._id,            // ✅ Use `_id` for consistency
        email: newUser.email,
        name: newUser.name,
      },
      token,
    });
  } catch (err) {
    console.error("❌ Signup Error:", err);
    return sendResponse(res, false, 500, "Server error", err);
  }
};



export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const emailNormalized = email.trim().toLowerCase();

  try {
    const user = await User.findOne({ email: emailNormalized });
    if (!user) {
      return sendResponse(res, false, 401, "Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendResponse(res, false, 401, "Invalid credentials");
    }

    const token = generateToken({ id: user._id });

    return sendResponse(res, true, 200, "Login successful", {
      user: {
        _id: user._id,               // ✅ Use `_id` for consistency
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    return sendResponse(res, false, 500, "Server error", err);
  }
};


