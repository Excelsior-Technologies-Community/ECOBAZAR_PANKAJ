import db from "../Config/db.js";

export const getAllOrders = async (req, res) => {
    try {
        const [orders] = await db.query(
            `
      SELECT
        id,
        full_name,
        email,
        phone,
        total_amount,
        payment_method,
        payment_status,
        order_status,
        created_at
      FROM orders
      ORDER BY created_at DESC
      `
        );

        return res.status(200).json({
            success: true,
            count: orders.length,
            orders,
        });

    } catch (error) {
        console.error("GET ALL ORDERS ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
            error: error.message,
        });
    }
};

export const getSingleOrderAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const [[order]] = await db.query(`select * from orders where id = ? `, [id])

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "order is not found"
            })
        }

        const [items] = await db.query(`select 
            oi.id,
            oi.quantity ,
            oi.price ,
            oi.subtotal ,
            
            p.id as product_id ,
            p.name ,
            p.image 
            
            from order_items oi 
            join products p 
            on oi.product_id = p.id 
            where oi.order_id = ?` , [id])
        return res.status(200).json({
            success: true,
            order,
            items,
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


export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { order_status } = req.body;
        const validStatus = [
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled",
        ]
        if (!validStatus.includes(order_status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order status",
            })
        }

        const [[order]] = await db.query(`select id from orders where id = ?`, [id]);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        await db.query(`update orders set order_status = ? where id = ?`, [order_status, id])

        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
        })
    } catch (error) {
        console.error("UPDATE ORDER STATUS ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update order status",
            error: error.message,
        });
    }
}