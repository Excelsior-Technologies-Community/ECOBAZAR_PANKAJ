import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const MyOrdersContentSection = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.get("http://localhost:5000/api/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(data.orders);
    } catch (error) {
      console.error(error);
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };
  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      case "Processing":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };
  if (loading) {
    return (
      <section className="px-4 py-14">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex h-[300px] items-center justify-center">
            <p className="text-lg font-medium text-[#666666]">
              Loading Orders...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-4 py-14">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex h-[300px] items-center justify-center">
            <p className="text-lg font-medium text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-12 lg:py-16">
      <div className="mx-auto max-w-[1320px]">
        {/* Header */}

        <div className="mb-8">
          <h2 className="text-[34px] font-semibold text-[#1A1A1A]">
            My Orders
          </h2>

          <p className="mt-2 text-[#666666]">
            Track and manage all your orders.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-[10px] border border-[#E6E6E6] bg-white px-6 py-20 text-center">
            <h3 className="text-[28px] font-semibold text-[#1A1A1A]">
              No Orders Found
            </h3>

            <p className="mt-3 text-[#666666]">
              Looks like you haven't placed any orders yet.
            </p>

            <Link
              to="/shop"
              className="mt-8 inline-flex h-[48px] items-center justify-center rounded-full bg-[#00B207] px-8 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <>
              {/* ================= Desktop Table ================= */}

              <div className="hidden overflow-hidden rounded-[10px] border border-[#E6E6E6] md:block">
                {/* Header */}
                <div className="grid grid-cols-[140px_180px_180px_180px_120px_160px] border-b border-[#E6E6E6] bg-[#F9F9F9] px-6 py-4">
                  <p className="text-sm font-medium uppercase text-[#808080]">
                    Order ID
                  </p>

                  <p className="text-sm font-medium uppercase text-[#808080]">
                    Date
                  </p>

                  <p className="text-sm font-medium uppercase text-[#808080]">
                    Payment
                  </p>

                  <p className="text-sm font-medium uppercase text-[#808080]">
                    Status
                  </p>

                  <p className="text-sm font-medium uppercase text-[#808080]">
                    Total
                  </p>

                  <p className="text-sm font-medium uppercase text-[#808080]">
                    Action
                  </p>
                </div>

                {/* Orders */}

                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="grid grid-cols-[140px_180px_180px_180px_120px_160px] items-center border-b border-[#E6E6E6] px-6 py-5 last:border-b-0"
                  >
                    <p className="font-medium text-[#1A1A1A]">#{order.id}</p>

                    <p className="text-[#666666]">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>

                    <p className="text-[#666666]">{order.payment_method}</p>

                    <div>
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusClass(
                          order.order_status,
                        )}`}
                      >
                        {order.order_status}
                      </span>
                    </div>

                    <p className="font-semibold text-[#1A1A1A]">
                      ${Number(order.total_amount).toFixed(2)}
                    </p>

                    <Link
                      to={`/my-orders/${order.id}`}
                      className="inline-flex h-[42px] w-fit items-center justify-center rounded-full bg-[#00B207] px-5 text-sm font-semibold text-white transition hover:bg-green-700"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>

              {/* ================= Mobile ================= */}

              <div className="space-y-5 md:hidden">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-[10px] border border-[#E6E6E6] bg-white p-5"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-[#1A1A1A]">
                        Order #{order.id}
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusClass(
                          order.order_status,
                        )}`}
                      >
                        {order.order_status}
                      </span>
                    </div>

                    <div className="mt-5 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#666666]">Date</span>

                        <span className="font-medium text-[#1A1A1A]">
                          {new Date(order.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-[#666666]">Payment</span>

                        <span className="font-medium text-[#1A1A1A]">
                          {order.payment_method}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-[#666666]">Total</span>

                        <span className="font-semibold text-[#1A1A1A]">
                          ${Number(order.total_amount).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <Link
                      to={`/my-orders/${order.id}`}
                      className="mt-6 inline-flex h-[46px] w-full items-center justify-center rounded-full bg-[#00B207] text-sm font-semibold text-white transition hover:bg-green-700"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            </>
          </>
        )}
      </div>
    </section>
  );
};

export default MyOrdersContentSection;
