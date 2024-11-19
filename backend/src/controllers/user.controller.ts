import { Request, Response } from "express";
import User from "../models/user.model";

// Get user profile
export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Get userId from the JWT token, which is added by authenticateUser middleware
    const userId = req.user.userId;

    // Find user by ID
    const user = await User.findById(userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Return user data without password
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user profile", error });
  }
};

// Update user profile
export const updateUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { name, email, password } = req.body;

    if (!userId) {
      res.status(400).json({ message: "User ID is missing" });
      return;
    }

    // Find the user in the database
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Update the user information
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;

    // Save the updated user
    await user.save();

    // Respond with updated user data (excluding password)
    res.status(200).json({
      message: "User profile updated successfully",
      user: { ...user.toObject(), password: undefined },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating user profile",
      error: `${error instanceof Error ? error.message : error}`,
    });
  }
};
