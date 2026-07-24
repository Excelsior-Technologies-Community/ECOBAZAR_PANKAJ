import db from "../Config/db.js";

export const createBlog = async (req, res) => {
    try {
        const { title,
            slug,
            description,
            content,
            category,
            author,
            tags, } = req.body;

        if (!title || !description || !content || !category || !slug || !author || !tags) {
            return res.status(400).json({
                success: false,
                message: "pls fill all required fields"
            })
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "image is required"
            })
        }

        const image = req.file.path;

        await db.query("insert into blogs ( title,  slug ,description, content,  category,  author,  tags,image) values (?,?,?,?,?,?,?,?) ", [title,
            slug,
            description,
            content,
            category,
            author || "Admin",
            JSON.stringify(tags), image]);


        return res.status(201).json({
            success: true,
            message: "Blog created successfully.",
        });

    } catch (error) {

        console.error("CREATE BLOG ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create blog.",
            error: error.message,
        });

    }
};

export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const [[existingBlog]] = await db.query(
            `SELECT * FROM blogs WHERE id = ?`,
            [id]
        );

        if (!existingBlog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found.",
            });
        }

        const {
            title,
            slug,
            description,
            content,
            category,
            author,
            tags,
        } = req.body;

        const image = req.file ? req.file.path : existingBlog.image;

        await db.query(
            `
      UPDATE blogs
      SET
        title = ?,
        slug = ?,
        description = ?,
        content = ?,
        image = ?,
        category = ?,
        author = ?,
        tags = ?
      WHERE id = ?
      `,
            [
                title || existingBlog.title,
                slug || existingBlog.slug,
                description || existingBlog.description,
                content || existingBlog.content,
                image,
                category || existingBlog.category,
                author || existingBlog.author,
                tags || existingBlog.tags,
                id,
            ]
        );

        return res.status(200).json({
            success: true,
            message: "Blog updated successfully.",
        });

    } catch (error) {
        console.error("UPDATE BLOG ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update blog.",
            error: error.message,
        });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const [[blog]] = await db.query(
            `
      SELECT id
      FROM blogs
      WHERE id = ?
      `,
            [id]
        );

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found.",
            });
        }

        await db.query(
            `
      DELETE FROM blogs
      WHERE id = ?
      `,
            [id]
        );

        return res.status(200).json({
            success: true,
            message: "Blog deleted successfully.",
        });

    } catch (error) {

        console.error("DELETE BLOG ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete blog.",
            error: error.message,
        });

    }
};