import db from "../Config/db.js";

export const getAllBlogs = async (req, res) => {
    try {
        const [blogs] = await db.query(`
      SELECT
        id,
        title,
        slug,
        description,
        image,
        category,
        author,
        tags,
        created_at

      FROM blogs

      ORDER BY created_at DESC
    `);

        const formattedBlogs = blogs.map((blog) => ({
            ...blog, tags: blog.tags ? JSON.parse(blog.tags) : [],
        }));

        return res.status(200).json({
            success: true,
            count: formattedBlogs.length,
            blogs: formattedBlogs
        })

    } catch (error) {
        console.error("GET BLOGS ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch blogs.",
            error: error.message,
        });
    }
}

export const singleBlog = async (req, res) => {
    try {
        const { slug } = req.params;

        const [[blog]] = await db.query("select * from blogs where slug = ? ", [slug]);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "blog not found"
            })
        }

        blog.tags = blog.tags ? JSON.parse(blog.tags) : [];

        blog.content = blog.content ? JSON.parse(blog.content) : [];

        return res.status(200).json({
            success: true,
            blog,
        });
    } catch (error) {
        console.error("get single bog error", error);

        return res.status(500).json({
            success: false,
            message: "failed to fetch blogs",
            error: error.message
        })
    }
}