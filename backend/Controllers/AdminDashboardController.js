import db from "../Config/db.js"

export const getDashboard = async (req, res) => {
    try {
        //total users
        const [[users]] = await db.query("select count(*) as totalUsers from users");

        //total products
        const [[products]] = await db.query("select count(*) as totalProducts from products");

        //total orders 
        const [[orders]] = await db.query("select count(*) as totalOrders from orders");

        // Total Revenue
        const [[revenue]] = await db.query(`
      SELECT
      COALESCE(
        SUM(
          CASE
            WHEN payment_status='Paid'
            THEN total_amount
            ELSE 0
          END
        ),
      0) AS totalRevenue

      FROM orders
    `);

        //recent orders
        const [recentOrders] = await db.query(`
        select 
          id ,
          full_name ,
          total_amount ,
          order_status ,
          created_at 
          
          from orders 
          
          order by created_at desc 
          limit 5`)

        //latest users
        const [latestUsers] = await db.query(`
            select
             id, 
             name ,
             email ,
             created_at
             
             from users
             order by created_at desc
             limit 5`);

        return res.status(200).json({
            success: true,

            stats: {
                totalUsers: users.totalUsers,
                totalProducts: products.totalProducts,
                totalOrders: orders.totalOrders,
                totalRevenue: revenue.totalRevenue,
            },

            recentOrders,

            latestUsers,
        });

    } catch (error) {
        console.error("DASHBOARD ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to load dashboard",
            error: error.message,
        });
    }
}