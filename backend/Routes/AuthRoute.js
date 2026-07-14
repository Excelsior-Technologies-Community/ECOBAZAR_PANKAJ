import express from "express";
import { loginUser, registerUser } from "../Controllers/AuthController.js";

const UserRouter = express.Router();
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
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
 *                 example: Pankaj Singh
 *               email:
 *                 type: string
 *                 example: pankaj@gmail.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 */
UserRouter.post("/login", loginUser);
/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get logged in user's profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *       401:
 *         description: Unauthorized
 */
UserRouter.post("/register", registerUser);

export default UserRouter;