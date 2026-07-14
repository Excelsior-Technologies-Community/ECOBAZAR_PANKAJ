import express from "express";
import { addToCart, clearCart, getCart, removeCartItem, updateCartQuantity } from "../Controllers/CartController.js";
import { protect } from "../Middlewares/Authmiddleware.js";
const CartRouter = express.Router();

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
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
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Product added to cart
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
CartRouter.post("/", protect, addToCart);
/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get logged in user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart fetched successfully
 *       401:
 *         description: Unauthorized
 */
CartRouter.get("/", protect, getCart)
/**
 * @swagger
 * /api/cart/{id}:
 *   put:
 *     summary: Update cart quantity
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 4
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       404:
 *         description: Cart item not found
 */
CartRouter.put("/:id", protect, updateCartQuantity)
/**
 * @swagger
 * /api/cart/{id}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     responses:
 *       200:
 *         description: Item removed successfully
 */
CartRouter.delete("/:id", protect, removeCartItem);
/**
 * @swagger
 * /api/cart/clear/all:
 *   delete:
 *     summary: Clear logged in user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 */
CartRouter.delete("/clear/all", protect, clearCart)

export default CartRouter;