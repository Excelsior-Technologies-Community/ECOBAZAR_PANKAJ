import jwt from "jsonwebtoken";

const generateToken = (userId, role) => {
    return jwt.sign(
        {
            id: userId,
            role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "30d",
        }
    );
};

export default generateToken;