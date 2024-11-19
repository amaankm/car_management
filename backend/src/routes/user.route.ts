import express from "express";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller";
import { authenticateUser } from "../middleware/authenticateUser";

const router = express.Router();

// Get user profile route
/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve the profile details of the authenticated user. The user's password is excluded from the response.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64bfcdf2e40d324d64e76aef"
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-16T12:34:56.789Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-16T12:34:56.789Z"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Error fetching user profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching user profile"
 *                 error:
 *                   type: string
 *                   example: "Error details"
 */
router.get("/profile", authenticateUser, getUserProfile);

/**
 * @swagger
 * /users/profile:
 *   put:
 *     summary: Update user profile
 *     description: Update the authenticated user's profile information such as name, email, and password.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New name of the user.
 *                 example: "Jane Doe"
 *               email:
 *                 type: string
 *                 description: New email address of the user.
 *                 example: "janedoe@example.com"
 *               password:
 *                 type: string
 *                 description: New password for the user.
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: User profile updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User profile updated successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64bfcdf2e40d324d64e76aef"
 *                     name:
 *                       type: string
 *                       example: "Jane Doe"
 *                     email:
 *                       type: string
 *                       example: "janedoe@example.com"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-16T12:34:56.789Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-16T12:34:56.789Z"
 *       400:
 *         description: Missing user ID or bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User ID is missing"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Error updating user profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error updating user profile"
 *                 error:
 *                   type: string
 *                   example: "Error details"
 */
router.put("/profile", authenticateUser, updateUserProfile);

export default router;
