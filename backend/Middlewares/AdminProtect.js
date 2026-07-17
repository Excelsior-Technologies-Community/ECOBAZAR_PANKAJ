import jwt from "jsonwebtoken";

export const adminProtect = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, token missing",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admin only.",
            });
        }

        req.user = {
            id: decoded.id,
            role: decoded.role,
        };

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Not authorized",
            error: error.message,
        });
    }
};