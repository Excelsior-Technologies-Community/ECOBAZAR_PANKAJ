import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./Config/db.js";
import UserRouter from "./Routes/AuthRoute.js";

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



