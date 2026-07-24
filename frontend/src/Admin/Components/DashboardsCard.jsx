import { Package, ShoppingCart, Users, IndianRupee } from "lucide-react";

import StatsCard from "./StatsCard";

const DashboardCard = ({ stats }) => {
  const cards = [
    {
      title: "Products",
      value: stats.totalProducts,
      icon: Package,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Users",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Revenue",
      value: `₹ ${Number(stats.totalRevenue).toLocaleString()}`,
      icon: IndianRupee,
      color: "bg-purple-100 text-purple-600",
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <StatsCard key={card.title} {...card} />
      ))}
    </div>
  );
};

export default DashboardCard;
