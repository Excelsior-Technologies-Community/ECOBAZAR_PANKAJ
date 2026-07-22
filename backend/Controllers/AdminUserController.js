import db from "../Config/db.js";

export const getAllUsers = async (req, res) => {
    try {
        const [users] = await db.query(
            `
      SELECT
        u.id,
        u.name,
        u.email,
        u.role,
        u.created_at,

        COUNT(o.id) AS total_orders,

        COALESCE(SUM(o.total_amount), 0) AS total_spent

      FROM users u

      LEFT JOIN orders o
      ON u.id = o.user_id

      GROUP BY
        u.id,
        u.name,
        u.email,
        u.role,
        u.created_at

      ORDER BY u.created_at DESC
      `
        );

        return res.status(200).json({
            success: true,
            count: users.length,
            users,
        });

    } catch (error) {
        console.error("GET ALL USERS ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error.message,
        });
    }
};

export const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params;

        // User Details
        const [[user]] = await db.query(
            `
      SELECT
        id,
        name,
        email,
        role,
        created_at
      FROM users
      WHERE id = ?
      `,
            [id]
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // User Orders
        const [orders] = await db.query(
            `
      SELECT
        id,
        total_amount,
        payment_method,
        payment_status,
        order_status,
        created_at

      FROM orders

      WHERE user_id = ?

      ORDER BY created_at DESC
      `,
            [id]
        );

        // Summary
        const [[summary]] = await db.query(
            `
      SELECT

        COUNT(id) AS total_orders,

        COALESCE(SUM(total_amount),0) AS total_spent

      FROM orders

      WHERE user_id = ?
      `,
            [id]
        );

        return res.status(200).json({
            success: true,
            user,
            summary,
            orders,
        });

    } catch (error) {

        console.error("GET SINGLE USER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch user",
            error: error.message,
        });

    }
};