import express from "express";
import { addToCart, clearCart, getCart, removeCartItem, updateCartQuantity } from "../Controllers/CartController.js";
import { protect } from "../Middlewares/Authmiddleware.js";
const CartRouter = express.Router();

CartRouter.post("/", protect, addToCart);
CartRouter.get("/", protect, getCart)
CartRouter.put("/:id", protect, updateCartQuantity)
CartRouter.delete("/:id", protect, removeCartItem);
CartRouter.delete("/clear/all", protect, clearCart)

export default CartRouter;