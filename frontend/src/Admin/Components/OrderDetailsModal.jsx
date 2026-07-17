import { useEffect, useState } from "react";
import axios from "axios";

const OrderDetailsModal = ({ open, setOpen, orderId, fetchOrders }) => {
  const [loading, setLoading] = useState(false);

  const [order, setOrder] = useState(null);

  const [items, setItems] = useState([]);

  const [status, setStatus] = useState("");

  const fetchOrder = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `http://localhost:5000/api/admin/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOrder(data.order);

      setItems(data.items);

      setStatus(data.order.order_status);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && orderId) {
      fetchOrder();
    }
  }, [open, orderId]);

  const handleUpdateStatus = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.put(
        `http://localhost:5000/api/admin/orders/${orderId}/status`,
        {
          order_status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(data.message);

      fetchOrder();

      fetchOrders();
    } catch (error) {
      console.log(error);

      alert("Failed to update status");
    }
  };

  if (!open) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="rounded-xl bg-white p-8">Loading...</div>
      </div>
    );
  }

  if (!order) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-8">
        {/* Header */}

        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Order #{order.id}</h2>

          <button onClick={() => setOpen(false)} className="text-3xl">
            ×
          </button>
        </div>
        <div className="mb-8 rounded-xl bg-gray-50 p-5">
          <h3 className="mb-4 text-lg font-semibold">Customer Details</h3>

          <div className="grid grid-cols-2 gap-4">
            <p>
              <strong>Name:</strong> {order.full_name}
            </p>

            <p>
              <strong>Email:</strong> {order.email}
            </p>

            <p>
              <strong>Phone:</strong> {order.phone}
            </p>

            <p>
              <strong>Payment:</strong> {order.payment_method}
            </p>
          </div>
        </div>
        <div className="mb-8 rounded-xl bg-gray-50 p-5">
          <h3 className="mb-4 text-lg font-semibold">Shipping Address</h3>

          <p>{order.address}</p>

          <p>
            {order.city}, {order.state}
          </p>

          <p>
            {order.country} - {order.zip_code}
          </p>
        </div>
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold">Ordered Products</h3>

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-xl border p-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h4 className="font-semibold">{item.name}</h4>

                  <p>Qty : {item.quantity}</p>
                </div>

                <div>₹ {item.subtotal}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-gray-50 p-5">
          <h3 className="mb-4 text-lg font-semibold">Order Status</h3>

          <div className="flex gap-4">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border px-4 py-2"
            >
              <option>Pending</option>

              <option>Processing</option>

              <option>Shipped</option>

              <option>Delivered</option>

              <option>Cancelled</option>
            </select>

            <button
              onClick={handleUpdateStatus}
              className="rounded-lg bg-[#00B207] px-6 text-white"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
