import express from "express";
import { adminProtect } from "../Middlewares/AdminProtect.js";
import { getDashboard } from "../Controllers/AdminDashboardController.js";


const AdminDashboardRouter = express.Router();

AdminDashboardRouter.get("/", adminProtect, getDashboard);

export default AdminDashboardRouter;