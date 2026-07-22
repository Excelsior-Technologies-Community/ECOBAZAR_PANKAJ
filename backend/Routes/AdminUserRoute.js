import express from "express";

import {
    getAllUsers,
    getSingleUser,
} from "../Controllers/AdminUserController.js";

import { adminProtect } from "../Middlewares/AdminProtect.js";

const AdminUserRouter = express.Router();

AdminUserRouter.get("/", adminProtect, getAllUsers);

AdminUserRouter.get("/:id", adminProtect, getSingleUser);

export default AdminUserRouter;