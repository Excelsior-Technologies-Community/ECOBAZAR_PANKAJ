import express from "express";

import upload from "../middleware/multer.middleware.js";
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../Controllers/ProductController.js";

const ProductRouter = express.Router();

ProductRouter.post("/", upload.single("image"), createProduct);
ProductRouter.get("/", getAllProducts);
ProductRouter.get("/:id", getSingleProduct);
ProductRouter.put("/:id", upload.single("image"), updateProduct);
ProductRouter.delete("/:id", deleteProduct);

export default ProductRouter;