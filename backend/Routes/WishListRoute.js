import express from "express";
import { addToWishlist, getWishlist, removeWishlistItem } from "../Controllers/WishlistController.js";
import { protect } from "../Middlewares/Authmiddleware.js";

const WishlistRouter = express.Router();
/**
 * @swagger
 * /api/wishlist:
 *   post:
 *     summary: Add product to wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: integer
 *                 example: 15
 *     responses:
 *       201:
 *         description: Product added to wishlist
 */
WishlistRouter.post("/", protect, addToWishlist);

/**
 * @swagger
 * /api/wishlist:
 *   get:
 *     summary: Get logged in user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist fetched successfully
 */
WishlistRouter.get("/", protect, getWishlist)

/**
 * @swagger
 * /api/wishlist/{id}:
 *   delete:
 *     summary: Remove wishlist item
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 3
 *     responses:
 *       200:
 *         description: Wishlist item removed successfully
 */
WishlistRouter.delete("/:id", protect, removeWishlistItem)

export default WishlistRouter;