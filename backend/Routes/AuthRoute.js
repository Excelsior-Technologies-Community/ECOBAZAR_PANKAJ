import express from "express";
import { loginUser, registerUser } from "../Controllers/AuthController.js";

const UserRouter = express.Router();

UserRouter.post("/login", loginUser);
UserRouter.post("/register", registerUser);

export default UserRouter;