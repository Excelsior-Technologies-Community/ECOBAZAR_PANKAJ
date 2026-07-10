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



export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            })
        }

        const [[user]] = await db.query(`select * from users where email = ? `, [email]);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user doest found"
            })
        }

        const isPassMatch = await bcrypt.compare(password, user.password);

        if (!isPassMatch) {
            return res.status(401).json({
                success: false,
                message: "invalid pass"
            })
        }

        const token = generateToken(user.id);

        return res.status(200).json({
            success: true,
            message: "loginn succesfully",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })
    } catch (error) {
        console.error("LOGIN ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message,
        });
    }
}