import db from "../Config/db.js"

export const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        //validation 
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "product id is required"
            })
        }

        //check products exists ?
        const [[product]] = await db.query("select id from products where id = ?", [productId])

        if (!product) {
            return res.status(404).json({
                succes: false,
                message: "product not found"
            })
        }

        //check if already in cart 
        const [[cartItem]] = await db.query(`select * from cart_items where user_id = ? and product_id = ? `, [userId, productId]);

        if (cartItem) {
            await db.query(`update cart_items set quantity = quantity + ? where id = ?`, [quantity || 1, cartItem.id])

            return res.status(200).json({
                success: true,
                message: "Cart quantity updated",
            });
        }

        await db.query(`insert into cart_items (user_id ,product_id ,quantity ) values (? ,? ,?)`, [userId, productId, quantity || 1])
        return res.status(201).json({
            success: true,
            message: "Product added to cart",
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Failed to add product to cart",
            error: error.message,
        });
    }
}

export const getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const [cartItems] = await db.query(`select 
            cart_items.id,
            cart_items.quantity,

            products.id as productId,
            products.name,
            products.price,
            products.old_price,
            products.image,
            products.stock_status,
            (cart_items.quantity * products.price) as subtotal

            from cart_items
            inner join products
            on cart_items.product_id = products.id
            where cart_items.user_id =?
            ` , [userId]);
        return res.status(200).json({
            success: true,
            count: cartItems.length,
            cart: cartItems
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch cart",
            error: error.message,
        });
    }
}

export const updateCartQuantity = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { quantity } = req.body;

        //validation
        if (!quantity || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be at least 1"
            })
        }

        //check cart item exists
        const [[cartItem]] = await db.query(`select * from cart_items where id =? and user_id = ?`, [id, userId]);

        if (!cartItem) {
            return res.status(404).json({
                success: true,
                message: "cart is not found"
            })
        }

        //update quntity

        await db.query(`update cart_items set quantity = ? where id = ?`, [quantity, id]);


        return res.status(200).json({
            success: true,
            message: "Cart updated successfully",
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Failed to update cart",
            error: error.message,
        });

    }
};

export const removeCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        //check cart item exists
        const [[cartItem]] = await db.query(
            `select * from cart_items where id =? and user_id = ?`, [id, userId])

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found",
            })
        }

        await db.query("delete from cart_items where id = ?", [id]);

        return res.status(200).json({
            success: true,
            message: "Item removed from cart",
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Failed to remove item",
            error: error.message,
        });

    }
};

export const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        await db.query(
            `DELETE FROM cart_items
       WHERE user_id = ?`,
            [userId]
        );

        return res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Failed to clear cart",
            error: error.message,
        });

    }
};