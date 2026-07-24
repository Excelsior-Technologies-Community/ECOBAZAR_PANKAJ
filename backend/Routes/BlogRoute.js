import express from "express";
import { getAllBlogs, singleBlog } from "../Controllers/BlogController.js";


const BlogRouter = express.Router();

BlogRouter.get("/", getAllBlogs);
BlogRouter.get("/:slug", singleBlog);

export default BlogRouter;