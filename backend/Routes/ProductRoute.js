import express from "express";

import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../Controllers/ProductController.js";
import upload from "../Middlewares/multermiddleware.js";

const ProductRouter = express.Router();

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: Creates a new product with image upload.
 *     tags:
 *       - Products
 *
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 example: Capsicum
 *
 *               price:
 *                 type: number
 *                 example: 7.99
 *
 *               old_price:
 *                 type: number
 *                 example: 9.99
 *
 *               category:
 *                 type: string
 *                 example: Vegetables
 *
 *               brand:
 *                 type: string
 *                 example: Ecobazar
 *
 *               description:
 *                 type: string
 *                 example: Fresh organic capsicum.
 *
 *               image:
 *                 type: string
 *                 format: binary
 *
 *     responses:
 *       201:
 *         description: Product created successfully
 *
 *       400:
 *         description: Invalid input
 *
 *       500:
 *         description: Internal server error
 */
ProductRouter.post("/", upload.single("image"), createProduct);
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: List of all products
 */
ProductRouter.get("/", getAllProducts);
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get single product
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product details
 */
ProductRouter.get("/:id", getSingleProduct);
/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update product
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product updated
 */
ProductRouter.put("/:id", upload.single("image"), updateProduct);
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted
 */
ProductRouter.delete("/:id", deleteProduct);

export default ProductRouter;