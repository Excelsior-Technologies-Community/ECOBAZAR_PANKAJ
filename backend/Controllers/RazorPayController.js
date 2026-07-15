import razorpay from "../Config/razorpay.js";
import db from "../Config/db.js"
import crypto from "crypto";


export const createRazorpayOrder = async (req, res) => {
    try {
        const userId = req.user.id;

        // Get cart items with product prices
        const [cartItems] = await db.query(
            `
      SELECT
        cart_items.quantity,
        products.price
      FROM cart_items
      JOIN products
      ON cart_items.product_id = products.id
      WHERE cart_items.user_id = ?
      `,
            [userId]
        );

        // Check empty cart
        if (cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty",
            });
        }

        // Calculate total
        const total = cartItems.reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0);

        // Razorpay accepts amount in paise
        const amount = Math.round(total * 100);

        // Create Razorpay Order
        const razorpayOrder = await razorpay.orders.create({
            amount,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        });

        return res.status(200).json({
            success: true,
            message: "Razorpay order created successfully",
            order: razorpayOrder,
            key: process.env.RAZORPAY_KEY_ID,
        });
    } catch (error) {
        console.error("CREATE RAZORPAY ORDER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        const body =
            razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Payment Verification Failed",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Payment Verified Successfully",
        });
    } catch (error) {
        console.log("VERIFY PAYMENT ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};