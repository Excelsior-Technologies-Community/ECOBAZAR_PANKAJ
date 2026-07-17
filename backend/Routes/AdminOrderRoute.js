import express from "express";
import { getAllOrders, getSingleOrderAdmin, updateOrderStatus } from "../Controllers/AdminOrderController.js";
import { adminProtect } from "../Middlewares/AdminProtect.js";

const AdminOrderRouter = express.Router();

AdminOrderRouter.get("/", adminProtect, getAllOrders);
AdminOrderRouter.get("/:id", adminProtect, getSingleOrderAdmin);
AdminOrderRouter.put("/:id/status", adminProtect, updateOrderStatus);


export default AdminOrderRouter;