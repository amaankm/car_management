import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller";
import { authenticateUser } from "../middleware/authenticateUser";

const router = express.Router();

// User registration route
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Allows a user to register by providing their name, email, and password. The system checks if the user already exists and creates a new user if not. A JWT token is generated and set in cookies upon successful registration.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The password for the user
 *                 example: Passw0rd!
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The ID of the registered user
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User already exists
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error registering user
 *                 error:
 *                   type: string
 */

router.post("/signup", registerUser);

// User login route
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticates a user by email and password. If successful, sets an authentication token in the cookies and returns user details.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password.
 *                 example: "P@ssw0rd!"
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The unique ID of the user.
 *                       example: "64b5a5f3c6e1e7d5f0c4a8b2"
 *                     name:
 *                       type: string
 *                       description: User's full name.
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       description: User's email address.
 *                       example: user@example.com
 *       400:
 *         description: Invalid email or password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid email or password
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error logging in
 *                 error:
 *                   type: object
 */
router.post("/login", loginUser);

// User logout route
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out a user
 *     description: Logs out a user by clearing the JWT cookie.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: User logged out successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logout successful
 */
router.post("/logout", authenticateUser, logoutUser);

export default router;
