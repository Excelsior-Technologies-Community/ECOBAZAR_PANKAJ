import db from "../Config/db.js";

export const createProduct = async (req, res) => {
    try {
        const {
            name,
            price,
            old_price,
            rating,
            reviews_count,
            badge,
            badge_type,
            out_of_stock,
            category,
            sku,
            stock_status,
            brand,
            discount,
            short_description,
            description,
            features,
            weight,
            color,
            type,
            organic,
        } = req.body;

        if (!name || !price) {
            return res.status(400).json({
                success: false,
                message: "Name and price are requires"
            })
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Product image is required"
            })
        }

        const image = req.file.path;

        let parsedFeatures = [];

        if (features) {
            if (Array.isArray(features)) {
                parsedFeatures = features;
            } else {
                try {
                    parsedFeatures = JSON.parse(features);
                } catch {
                    parsedFeatures = [features];
                }
            }
        }

        const [result] = await db.query(`   INSERT INTO products
      (
        name,
        price,
        old_price,
        rating,
        reviews_count,
        image,
        badge,
        badge_type,
        out_of_stock,
        category,
        sku,
        stock_status,
        brand,
        discount,
        short_description,
        description,
        features,
        weight,
        color,
        type,
        organic
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            name,
            price,
            old_price || null,
            rating || 0,
            reviews_count || 0,
            image,
            badge || null,
            badge_type || null,
            out_of_stock === "true" || out_of_stock === true ? 1 : 0,
            category || null,
            sku || null,
            stock_status || "In Stock",
            brand || null,
            discount || null,
            short_description || null,
            description || null,
            JSON.stringify(parsedFeatures),
            weight || null,
            color || null,
            type || null,
            organic || null,
        ]
        );
        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            productId: result.insertId,
            image,
        });



    } catch (error) {
        console.error("CREATE PRODUCT ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create product",
            error: error.message,
        });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const [products] = await db.query(`select * from products order by id desc `)

        const formattedProducts = products.map((product) => ({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            oldPrice: product.old_price ? Number(product.old_price) : null,
            rating: product.rating,
            reviewsCount: product.reviews_count,
            image: product.image,
            badge: product.badge,
            badgeType: product.badge_type,
            outOfStock: Boolean(product.out_of_stock),
            category: product.category,
            sku: product.sku,
            stockStatus: product.stock_status,
            brand: product.brand,
            discount: product.discount,
            shortDescription: product.short_description,
            description: product.description,
            features: product.features ? JSON.parse(product.features) : [],
            additionalInfo: {
                weight: product.weight,
                color: product.color,
                type: product.type,
                category: product.category,
                stock: product.stock_status,
                brand: product.brand,
                sku: product.sku,
                organic: product.organic,
            },
        }));
        return res.status(200).json({
            success: true,
            count: formattedProducts.length,
            products: formattedProducts,
        });
    } catch (error) {
        console.error("GET ALL PRODUCTS ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            error: error.message,
        });
    }
}

export const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const [[product]] = await db.query(`select * from products where id = ?`, [id]);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        const [reviews] = await db.query(
            `
      SELECT id, name, rating, review_date, comment
      FROM product_reviews
      WHERE product_id = ?
      ORDER BY id DESC
      `,
            [id]
        );

        const formattedProduct = {
            id: product.id,
            name: product.name,
            price: Number(product.price),
            oldPrice: product.old_price ? Number(product.old_price) : null,
            rating: product.rating,
            reviewsCount: product.reviews_count,
            image: product.image,
            badge: product.badge,
            badgeType: product.badge_type,
            outOfStock: Boolean(product.out_of_stock),
            category: product.category,
            sku: product.sku,
            stockStatus: product.stock_status,
            brand: product.brand,
            discount: product.discount,
            shortDescription: product.short_description,
            description: product.description,
            features: product.features ? JSON.parse(product.features) : [],
            additionalInfo: {
                weight: product.weight,
                color: product.color,
                type: product.type,
                category: product.category,
                stock: product.stock_status,
                brand: product.brand,
                sku: product.sku,
                organic: product.organic,
            },
            reviews: reviews.map((review) => ({
                id: review.id,
                name: review.name,
                rating: review.rating,
                date: review.review_date,
                comment: review.comment,
            })),
        };
        return res.status(200).json({
            success: true,
            product: formattedProduct,
        });
    } catch (error) {
        console.error("GET SINGLE PRODUCT ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch product",
            error: error.message,
        });
    }
}

// ================= UPDATE PRODUCT =================
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const [[existingProduct]] = await db.query(
            "SELECT * FROM products WHERE id = ?",
            [id]
        );

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const {
            name,
            price,
            old_price,
            rating,
            reviews_count,
            badge,
            badge_type,
            out_of_stock,
            category,
            sku,
            stock_status,
            brand,
            discount,
            short_description,
            description,
            features,
            weight,
            color,
            type,
            organic,
        } = req.body;

        let parsedFeatures = existingProduct.features
            ? JSON.parse(existingProduct.features)
            : [];

        if (features !== undefined) {
            if (Array.isArray(features)) {
                parsedFeatures = features;
            } else {
                try {
                    parsedFeatures = JSON.parse(features);
                } catch {
                    parsedFeatures = [features];
                }
            }
        }

        const updatedImage = req.file ? req.file.path : existingProduct.image;

        const [result] = await db.query(
            `
  UPDATE products
  SET
    name = ?,
    price = ?,
    old_price = ?,
    rating = ?,
    reviews_count = ?,
    image = ?,
    badge = ?,
    badge_type = ?,
    out_of_stock = ?,
    category = ?,
    sku = ?,
    stock_status = ?,
    brand = ?,
    discount = ?,
    short_description = ?,
    description = ?,
    features = ?,
    weight = ?,
    color = ?,
    type = ?,
    organic = ?
  WHERE id = ?
  `,
            [
                name ?? existingProduct.name,
                price ?? existingProduct.price,
                old_price ?? existingProduct.old_price,
                rating ?? existingProduct.rating,
                reviews_count ?? existingProduct.reviews_count,
                updatedImage,
                badge ?? existingProduct.badge,
                badge_type ?? existingProduct.badge_type,
                out_of_stock !== undefined
                    ? out_of_stock === "true" || out_of_stock === true
                        ? 1
                        : 0
                    : existingProduct.out_of_stock,
                category ?? existingProduct.category,
                sku ?? existingProduct.sku,
                stock_status ?? existingProduct.stock_status,
                brand ?? existingProduct.brand,
                discount ?? existingProduct.discount,
                short_description ?? existingProduct.short_description,
                description ?? existingProduct.description,
                JSON.stringify(parsedFeatures),
                weight ?? existingProduct.weight,
                color ?? existingProduct.color,
                type ?? existingProduct.type,
                organic ?? existingProduct.organic,
                id,
            ]
        );

        console.log(result);
        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
        });
    } catch (error) {
        console.error("UPDATE PRODUCT ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update product",
            error: error.message,
        });
    }
};

// ================= DELETE PRODUCT =================
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const [[existingProduct]] = await db.query(
            "SELECT id FROM products WHERE id = ?",
            [id]
        );

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        await db.query("DELETE FROM products WHERE id = ?", [id]);

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error("DELETE PRODUCT ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete product",
            error: error.message,
        });
    }
};