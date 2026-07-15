import express from "express";
import { createRazorpayOrder, verifyPayment } from "../Controllers/RazorPayController.js";
import { protect } from "../Middlewares/Authmiddleware.js"
const RazorRouter = express.Router();

RazorRouter.post("/create-order", protect, createRazorpayOrder);
RazorRouter.post("/verify", protect, verifyPayment)

export default RazorRouter;