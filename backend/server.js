import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./Config/db.js";
import UserRouter from "./Routes/AuthRoute.js";
import ProductRouter from "./Routes/ProductRoute.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./Config/Swagger.js";
import CartRouter from "./Routes/CartRoute.js";
import WishlistRouter from "./Routes/WishListRoute.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status.json({
        success: true,
        message: " EcoBazar backend is runnig"
    })
})

app.use("/api/user", UserRouter);
app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter)
app.use("/api/wishlist", WishlistRouter)
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);
const startServer = async () => {
    try {
        const [rows] = await db.query("SELECT 1");
        console.log("✅ Database connected successfully");
        console.log("DB test result:", rows);

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
    }
};

startServer();



