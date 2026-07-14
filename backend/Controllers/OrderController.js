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
        } = req.body;

        if (!fullName || !email || !phone || !country || !city || !state || !address || !zipCode || !orderNote || !paymentMethod) {

            return res.status(400).json({
                success: false,
                message: "please fill all required fields"
            })
        }

        //get cart items
        const [cartItems] = await db.query(`select 
            cart_items.product_id ,
            cart_items.quantity ,
            products.price

            from cart_items

            inner join products
            on cart_items.product_id = products.id 
            where cart_items.user_id = ?` , [userId])

        if (cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "cart is empty"
            })
        }

        //calculate total amt
        let totalAmount = 0;
        cartItems.forEach((item) => {
            totalAmount += Number(item.price) * item.quantity;
        })

        //create order
        const [orderResult] = await db.query(`
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
        payment_method
      )
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
            ]
        );

        const orderId = orderResult.insertId;

        //insert order items 
        for (const item of cartItems) {
            const subtotal = Number(item.price) * item.quantity;

            await db.query(
                `insert into order_items (order_id , product_id ,quantity ,price ,subtotal) values (?,?,?,?,?)`, [
                orderId,
                item.product_id,
                item.quantity,
                item.price,
                subtotal,
            ]
            )


        }
        // Clear Cart
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
        console.error("CREATE ORDER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to place order",
            error: error.message,
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