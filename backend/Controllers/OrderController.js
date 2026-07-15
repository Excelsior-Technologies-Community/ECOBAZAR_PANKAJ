import db from "../Config/db.js";


export const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            fullName,
            email,
            phone,
            country,
            state,
            city,
            address,
            zipCode,
            orderNote,
            paymentMethod,
            paymentStatus,
            razorpayOrderId,
            razorpayPaymentId,
        } = req.body;

        // ============================
        // Get Cart Items
        // ============================

        const [cartItems] = await db.query(
            `
      SELECT
        cart_items.product_id,
        cart_items.quantity,
        products.price
      FROM cart_items
      JOIN products
      ON cart_items.product_id = products.id
      WHERE cart_items.user_id = ?
      `,
            [userId]
        );

        if (cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty",
            });
        }

        // ============================
        // Calculate Total
        // ============================

        const totalAmount = cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        // ============================
        // Create Order
        // ============================

        const [orderResult] = await db.query(
            `
      INSERT INTO orders
      (
        user_id,
        full_name,
        email,
        phone,
        country,
        state,
        city,
        address,
        zip_code,
        order_note,
        total_amount,
        payment_method,
        payment_status,
        razorpay_order_id,
        razorpay_payment_id
      )
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
            [
                userId,
                fullName,
                email,
                phone,
                country,
                state,
                city,
                address,
                zipCode,
                orderNote,
                totalAmount,
                paymentMethod,
                paymentStatus,
                razorpayOrderId,
                razorpayPaymentId,
            ]
        );

        const orderId = orderResult.insertId;

        // ============================
        // Insert Order Items
        // ============================

        for (const item of cartItems) {
            await db.query(
                `
        INSERT INTO order_items
        (
          order_id,
          product_id,
          quantity,
          price,subtotal
        )
        VALUES
        (?, ?, ?, ?,?)
        `,
                [
                    orderId,
                    item.product_id,
                    item.quantity,
                    item.price,
                    item.price * item.quantity,

                ]
            );
        }

        // ============================
        // Clear Cart
        // ============================

        await db.query(
            `
      DELETE FROM cart_items
      WHERE user_id = ?
      `,
            [userId]
        );

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            orderId,
        });

    } catch (error) {
        console.log("CREATE ORDER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        const [orders] = await db.query(
            `
      SELECT *
      FROM orders
      WHERE user_id = ?
      ORDER BY created_at DESC
      `,
            [userId]
        );

        return res.status(200).json({
            success: true,
            count: orders.length,
            orders,
        });
    } catch (error) {
        console.error("GET ORDERS ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
            error: error.message,
        });
    }
};


export const getSingleOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        // Check Order Exists
        const [[order]] = await db.query(
            `
      SELECT *
      FROM orders
      WHERE id = ?
      AND user_id = ?
      `,
            [id, userId]
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        // Get Order Items
        const [orderItems] = await db.query(
            `
      SELECT
        order_items.id,
        order_items.quantity,
        order_items.price,
        order_items.subtotal,

        products.id AS productId,
        products.name,
        products.image

      FROM order_items

      INNER JOIN products
      ON order_items.product_id = products.id

      WHERE order_items.order_id = ?
      `,
            [id]
        );

        const formattedItems = orderItems.map((item) => ({
            id: item.id,
            productId: item.productId,
            name: item.name,
            image: item.image,
            quantity: item.quantity,
            price: Number(item.price),
            subtotal: Number(item.subtotal),
        }));

        return res.status(200).json({
            success: true,
            order: {
                ...order,
                totalAmount: Number(order.total_amount),
                items: formattedItems,
            },
        });

    } catch (error) {
        console.error("GET SINGLE ORDER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch order",
            error: error.message,
        });
    }
};