import DashboardCard from "../Components/DashboardsCard";
import LatestUsers from "../Components/LatestUsers";
import RecentOrders from "../Components/RecentOrders";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#1A1A1A]">Dashboard</h1>

        <p className="mt-2 text-gray-500">
          Welcome back 👋 Manage your store easily.
        </p>
      </div>

      <DashboardCard />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentOrders />
        </div>

        <LatestUsers />
      </div>
    </div>
  );
};

export default Dashboard;
