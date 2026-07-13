import db from "../Config/db.js"

export const addToWishlist = async (req, res) => {
    try {
        const userId = req.user.id;

        const { productId } = req.body;

        // Validation
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required",
            });
        }

        // Check Product Exists
        const [[product]] = await db.query(
            "SELECT id FROM products WHERE id = ?",
            [productId]
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Check Already Exists
        const [[wishlistItem]] = await db.query(
            `SELECT * FROM wishlist
       WHERE user_id = ? AND product_id = ?`,
            [userId, productId]
        );

        if (wishlistItem) {
            return res.status(400).json({
                success: false,
                message: "Product already in wishlist",
            });
        }

        // Insert
        await db.query(
            `INSERT INTO wishlist(user_id, product_id)
       VALUES(?, ?)`,
            [userId, productId]
        );

        return res.status(201).json({
            success: true,
            message: "Product added to wishlist",
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Failed to add wishlist",
            error: error.message,
        });

    }
};
export const getWishlist = async (req, res) => {
    try {
        const userId = req.user.id;

        const [wishlist] = await db.query(
            `
      SELECT
        wishlist.id,
        products.id AS productId,
        products.name,
        products.price,
        products.image,
        products.stock_status,
        products.out_of_stock

      FROM wishlist

      INNER JOIN products
      ON wishlist.product_id = products.id

      WHERE wishlist.user_id = ?
      ORDER BY wishlist.id DESC
      `,
            [userId]
        );

        const formattedWishlist = wishlist.map((item) => ({
            id: item.id, // wishlist row id
            productId: item.productId,
            name: item.name,
            price: Number(item.price),
            image: item.image,
            stockStatus: item.stock_status,
            outOfStock: Boolean(item.out_of_stock),
        }));

        return res.status(200).json({
            success: true,
            count: formattedWishlist.length,
            wishlist: formattedWishlist,
        });
    } catch (error) {
        console.error("GET WISHLIST ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch wishlist",
            error: error.message,
        });
    }
};
export const removeWishlistItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        // Check wishlist item exists
        const [[wishlistItem]] = await db.query(
            `
      SELECT *
      FROM wishlist
      WHERE id = ?
      AND user_id = ?
      `,
            [id, userId]
        );

        if (!wishlistItem) {
            return res.status(404).json({
                success: false,
                message: "Wishlist item not found",
            });
        }

        // Delete wishlist item
        await db.query(
            `
      DELETE FROM wishlist
      WHERE id = ?
      `,
            [id]
        );

        return res.status(200).json({
            success: true,
            message: "Product removed from wishlist",
        });

    } catch (error) {

        console.error("REMOVE WISHLIST ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to remove wishlist item",
            error: error.message,
        });

    }
};