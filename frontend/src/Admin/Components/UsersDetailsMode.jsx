import { useEffect, useState } from "react";
import axios from "axios";

const UserDetailsModal = ({ open, setOpen, userId }) => {
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);

  const [summary, setSummary] = useState(null);

  const [orders, setOrders] = useState([]);

  const fetchUser = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `http://localhost:5000/api/admin/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUser(data.user);
      setSummary(data.summary);
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && userId) {
      fetchUser();
    }
  }, [open, userId]);

  if (!open) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="rounded-xl bg-white p-8">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white p-8">
        {/* Header */}

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>

            <p className="text-gray-500">{user.email}</p>
          </div>

          <button onClick={() => setOpen(false)} className="text-3xl">
            ×
          </button>
        </div>
        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="rounded-xl border p-5">
            <h4 className="text-gray-500">Total Orders</h4>

            <h2 className="mt-2 text-3xl font-bold">{summary.total_orders}</h2>
          </div>

          <div className="rounded-xl border p-5">
            <h4 className="text-gray-500">Total Spent</h4>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              ₹ {summary.total_spent}
            </h2>
          </div>

          <div className="rounded-xl border p-5">
            <h4 className="text-gray-500">Role</h4>

            <span
              className={`mt-3 inline-block rounded-full px-4 py-2 text-sm font-medium ${
                user.role === "admin"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {user.role}
            </span>
          </div>
        </div>
        <div className="mb-8 rounded-xl border p-5">
          <h3 className="mb-4 text-lg font-semibold">User Information</h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <p>
              <strong>Name :</strong>

              {user.name}
            </p>

            <p>
              <strong>Email :</strong>

              {user.email}
            </p>

            <p>
              <strong>Role :</strong>

              {user.role}
            </p>

            <p>
              <strong>Joined :</strong>

              {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Order History</h3>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-5 py-3 text-left">Order ID</th>

                  <th className="px-5 py-3 text-left">Amount</th>

                  <th className="px-5 py-3 text-left">Payment</th>

                  <th className="px-5 py-3 text-left">Status</th>

                  <th className="px-5 py-3 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="px-5 py-4">#{order.id}</td>

                    <td className="px-5 py-4">₹ {order.total_amount}</td>

                    <td className="px-5 py-4">{order.payment_method}</td>

                    <td className="px-5 py-4">{order.order_status}</td>

                    <td className="px-5 py-4">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
