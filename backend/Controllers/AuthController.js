import db from "../Config/db.js";
import bcrypt from "bcryptjs"
import generateToken from "../utils/genrateToken.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(404).json({
                success: false,
                message: "Name , email and password are required",
            })
        }

        const [[existingUser]] = await db.query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists with this email",
            });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const [result] = await db.query(`insert into users (name ,email ,password) values (? ,?,?)`, [name, email, hashedPass]);
        const token = generateToken(result.insertId)
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: result.insertId,
                name,
                email,
                role: "user",
            },
        });
    } catch (error) {
        console.error("REGISTER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Registration failed",
            error: error.message,
        });
    }
}