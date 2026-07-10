import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
    try {
        let token;

        // token from Authorization header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        // if token not found
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, token missing",
            });
        }

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // attach user data to req
        req.user = {
            id: decoded.id,
        };

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, invalid token",
            error: error.message,
        });
    }
};