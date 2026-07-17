import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Eye } from "lucide-react";
import OrderDetailsModal from "./OrderDetailsModal";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "http://localhost:5000/api/admin/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Processing":
        return "bg-blue-100 text-blue-700";

      case "Shipped":
        return "bg-purple-100 text-purple-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        Loading Orders...
      </div>
    );
  }
  if (orders.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <h2 className="text-xl font-semibold">No Orders Found</h2>

        <p className="mt-2 text-gray-500">There are no customer orders yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#F8F9FA]">
              <tr>
                <th className="px-6 py-4 text-left">Order ID</th>

                <th className="px-6 py-4 text-left">Customer</th>

                <th className="px-6 py-4 text-left">Amount</th>

                <th className="px-6 py-4 text-left">Payment</th>

                <th className="px-6 py-4 text-left">Status</th>

                <th className="px-6 py-4 text-left">Date</th>

                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-5 font-semibold">#{order.id}</td>

                  <td className="px-6 py-5">{order.full_name}</td>

                  <td className="px-6 py-5">₹ {order.total_amount}</td>

                  <td className="px-6 py-5">{order.payment_method}</td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                        order.order_status,
                      )}`}
                    >
                      {order.order_status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      <button
                        onClick={() => {
                          setSelectedOrderId(order.id);
                          setOpenModal(true);
                        }}
                        className="rounded-lg bg-green-100 p-2 text-green-600 hover:bg-green-200"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <OrderDetailsModal
            open={openModal}
            setOpen={setOpenModal}
            orderId={selectedOrderId}
            fetchOrders={fetchOrders}
          />
        </div>
      </div>
    </>
  );
};

export default OrderTable;
