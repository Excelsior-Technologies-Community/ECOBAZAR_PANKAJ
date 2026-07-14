import express from "express";
import { createOrder, getMyOrders, getSingleOrder } from "../Controllers/OrderController.js";
import { protect } from "../Middlewares/Authmiddleware.js";

const OrderRouter = express.Router();
/**
 * @swagger
 * /api/order:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - phone
 *               - country
 *               - state
 *               - city
 *               - address
 *               - zipCode
 *               - paymentMethod
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Pankaj Singh
 *               email:
 *                 type: string
 *                 example: pankaj@gmail.com
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               country:
 *                 type: string
 *                 example: India
 *               state:
 *                 type: string
 *                 example: Gujarat
 *               city:
 *                 type: string
 *                 example: Anand
 *               address:
 *                 type: string
 *                 example: Near Railway Station
 *               zipCode:
 *                 type: string
 *                 example: "388001"
 *               orderNote:
 *                 type: string
 *                 example: Call before delivery
 *               paymentMethod:
 *                 type: string
 *                 example: COD
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       400:
 *         description: Invalid request or empty cart
 *       401:
 *         description: Unauthorized
 */
OrderRouter.post("/", protect, createOrder);
/**
 * @swagger
 * /api/order:
 *   get:
 *     summary: Get logged in user's orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *       401:
 *         description: Unauthorized
 */
OrderRouter.get("/", protect, getMyOrders);
/**
 * @swagger
 * /api/order/{id}:
 *   get:
 *     summary: Get single order details
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 15
 *     responses:
 *       200:
 *         description: Order fetched successfully
 *       404:
 *         description: Order not found
 *       401:
 *         description: Unauthorized
 */
OrderRouter.get("/:id", protect, getSingleOrder)

export default OrderRouter;