import express from "express";
import { addToWishlist, getWishlist, removeWishlistItem } from "../Controllers/WishlistController.js";
import { protect } from "../Middlewares/Authmiddleware.js";

const WishlistRouter = express.Router();

WishlistRouter.post("/", protect, addToWishlist);
WishlistRouter.get("/", protect, getWishlist)
WishlistRouter.delete("/:id", protect, removeWishlistItem)

export default WishlistRouter;