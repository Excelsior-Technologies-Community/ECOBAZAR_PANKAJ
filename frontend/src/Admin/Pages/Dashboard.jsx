import DashboardCard from "../Components/DashboardsCard";
import LatestUsers from "../Components/LatestUsers";
import RecentOrders from "../Components/RecentOrders";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);

  const [latestUsers, setLatestUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "http://localhost:5000/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setStats(data.stats);

      setRecentOrders(data.recentOrders);

      setLatestUsers(data.latestUsers);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">Loading...</div>
    );
  }
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#1A1A1A]">Dashboard</h1>

        <p className="mt-2 text-gray-500">
          Welcome back 👋 Manage your store easily.
        </p>
      </div>

      <DashboardCard stats={stats} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentOrders recentOrders={recentOrders} />
        </div>

        <LatestUsers latestUsers={latestUsers} />
      </div>
    </div>
  );
};

export default Dashboard;
