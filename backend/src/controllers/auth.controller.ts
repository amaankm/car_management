import { Request, Response } from "express";
import User from "../models/user.model";
import { generateTokenAndSetCookies } from "../utils/generateToken";

// Register a new user
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res
        .status(400)
        .json({ message: "Name, Email, Password must be provided" });
      return;
    }
    const sanitizedEmail = email.trim().toLowerCase();

    console.log(name, sanitizedEmail, password);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const isValidEmail = emailRegex.test(sanitizedEmail);

    if (!isValidEmail) {
      res.status(400).json({ message: "Provide a valid email address" });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ sanitizedEmail });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Create a new user
    const newUser = new User({ name, email: sanitizedEmail, password });
    await newUser.save();

    console.log(newUser);

    // Generate token and set it in the cookies
    generateTokenAndSetCookies(newUser._id, res);

    // Return response
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    // Compare password with hashed password in the database
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    // Generate token and set it in the cookies
    generateTokenAndSetCookies(user._id, res);

    // Return response
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Logout user
export const logoutUser = (_req: Request, res: Response) => {
  // Clear JWT cookie
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development", // Ensure secure cookies in production
  });

  res.status(200).json({ message: "Logout successful" });
};
