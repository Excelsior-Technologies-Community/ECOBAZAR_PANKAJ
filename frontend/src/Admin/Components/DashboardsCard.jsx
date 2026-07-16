import { Package, ShoppingCart, Users, IndianRupee } from "lucide-react";

import StatsCard from "./StatsCard";

const cards = [
  {
    title: "Products",
    value: 120,
    icon: Package,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Orders",
    value: 340,
    icon: ShoppingCart,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Users",
    value: 85,
    icon: Users,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Revenue",
    value: "₹2,45,670",
    icon: IndianRupee,
    color: "bg-purple-100 text-purple-600",
  },
];

const DashboardCard = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <StatsCard key={card.title} {...card} />
      ))}
    </div>
  );
};

export default DashboardCard;
