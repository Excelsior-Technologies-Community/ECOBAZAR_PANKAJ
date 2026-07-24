import express from "express";
import { adminProtect } from "../Middlewares/AdminProtect.js";

import upload from "../Middlewares/multermiddleware.js"
import {
    createBlog,
    deleteBlog,
    updateBlog,
} from "../Controllers/AdminBlogController.js";

const AdminRouter = express.Router();

AdminRouter.post(
    "/",
    adminProtect,
    upload.single("image"),
    createBlog
);
AdminRouter.put(
    "/:id",
    adminProtect,
    upload.single("image"),
    updateBlog
);
AdminRouter.delete(
    "/:id",
    adminProtect,
    deleteBlog
);

export default AdminRouter;