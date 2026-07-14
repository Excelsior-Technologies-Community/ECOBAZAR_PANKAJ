import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

function OrderDetailContentSection() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getOrder();
  }, [id]);

  const getOrder = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `http://localhost:5000/api/order/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOrder(data.order);
    } catch (error) {
      console.error(error);
      setError("Failed to load order.");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return `$${Number(price).toFixed(2)}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
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
      <section className="px-4 py-16">
        <div className="mx-auto flex h-[350px] max-w-[1320px] items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#00B207] border-t-transparent"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-4 py-16">
        <div className="mx-auto flex h-[350px] max-w-[1320px] items-center justify-center">
          <p className="text-lg font-medium text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  // Guard against rendering before order data has arrived
  if (!order) {
    return null;
  }

  return (
    <>
      <section className="px-4 py-12 lg:py-16">
        <div className="mx-auto max-w-[1320px]">
          {/* Header */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-[34px] font-semibold text-[#1A1A1A]">
                Order #{order.id}
              </h2>

              <p className="mt-2 text-[#666666]">
                Placed on {formatDate(order.created_at)}
              </p>
            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-medium ${getStatusClass(order.order_status)}`}
            >
              {order.order_status}
            </span>
          </div>

          {/* ================= Billing & Summary ================= */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Billing Address */}
            <div className="rounded-[10px] border border-[#E6E6E6] bg-white p-6">
              <h3 className="mb-6 text-xl font-semibold text-[#1A1A1A]">
                Billing Address
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#808080]">Name</p>
                  <p className="mt-1 font-medium text-[#1A1A1A]">
                    {order.full_name}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#808080]">Email</p>
                  <p className="mt-1 font-medium text-[#1A1A1A]">
                    {order.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#808080]">Phone</p>
                  <p className="mt-1 font-medium text-[#1A1A1A]">
                    {order.phone}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#808080]">Address</p>
                  <p className="mt-1 font-medium text-[#1A1A1A]">
                    {order.address}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[#808080]">City</p>
                    <p className="mt-1 font-medium text-[#1A1A1A]">
                      {order.city}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-[#808080]">State</p>
                    <p className="mt-1 font-medium text-[#1A1A1A]">
                      {order.state}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[#808080]">Country</p>
                    <p className="mt-1 font-medium text-[#1A1A1A]">
                      {order.country}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-[#808080]">Zip Code</p>
                    <p className="mt-1 font-medium text-[#1A1A1A]">
                      {order.zip_code}
                    </p>
                  </div>
                </div>

                {order.order_note && (
                  <div>
                    <p className="text-sm text-[#808080]">Order Note</p>
                    <p className="mt-1 text-[#1A1A1A]">{order.order_note}</p>
                  </div>
                )}
              </div>
            </div>

            {/* ================= Order Summary ================= */}
            <div className="rounded-[10px] border border-[#E6E6E6] bg-white p-6">
              <h3 className="mb-6 text-xl font-semibold text-[#1A1A1A]">
                Order Summary
              </h3>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[#666666]">Order ID</span>
                  <span className="font-semibold text-[#1A1A1A]">
                    #{order.id}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#666666]">Order Date</span>
                  <span className="font-medium text-[#1A1A1A]">
                    {formatDate(order.created_at)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#666666]">Payment Method</span>
                  <span className="font-medium text-[#1A1A1A]">
                    {order.payment_method}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#666666]">Payment Status</span>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      order.payment_status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.payment_status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#666666]">Order Status</span>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusClass(
                      order.order_status,
                    )}`}
                  >
                    {order.order_status}
                  </span>
                </div>

                <div className="border-t border-[#E6E6E6] pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-[#1A1A1A]">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-[#00B207]">
                      {formatPrice(order.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= Products ================= */}
          <div className="mt-10 overflow-hidden rounded-[10px] border border-[#E6E6E6] bg-white">
            <div className="border-b border-[#E6E6E6] px-6 py-5">
              <h3 className="text-xl font-semibold text-[#1A1A1A]">
                Ordered Products
              </h3>
            </div>

            {/* ================= Desktop Table ================= */}
            <div className="hidden md:block">
              <div className="grid grid-cols-[2fr_120px_120px_150px] border-b border-[#E6E6E6] bg-[#F8F8F8] px-6 py-4">
                <p className="text-sm font-medium uppercase text-[#808080]">
                  Product
                </p>
                <p className="text-sm font-medium uppercase text-[#808080]">
                  Price
                </p>
                <p className="text-sm font-medium uppercase text-[#808080]">
                  Qty
                </p>
                <p className="text-sm font-medium uppercase text-[#808080]">
                  Subtotal
                </p>
              </div>

              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[2fr_120px_120px_150px] items-center border-b border-[#E6E6E6] px-6 py-5 last:border-b-0"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 object-contain"
                    />
                    <div>
                      <h4 className="font-medium text-[#1A1A1A]">
                        {item.name}
                      </h4>
                    </div>
                  </div>

                  <p className="font-medium">{formatPrice(item.price)}</p>
                  <p className="font-medium">{item.quantity}</p>
                  <p className="font-semibold text-[#00B207]">
                    {formatPrice(item.subtotal)}
                  </p>
                </div>
              ))}
            </div>

            {/* ================= Mobile ================= */}
            <div className="space-y-5 p-5 md:hidden">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[10px] border border-[#E6E6E6] p-4"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 object-contain"
                    />

                    <div className="flex-1">
                      <h4 className="font-medium text-[#1A1A1A]">
                        {item.name}
                      </h4>

                      <div className="mt-3 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-[#666666]">Price</span>
                          <span>{formatPrice(item.price)}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-[#666666]">Quantity</span>
                          <span>{item.quantity}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-[#666666]">Subtotal</span>
                          <span className="font-semibold text-[#00B207]">
                            {formatPrice(item.subtotal)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= Back Button ================= */}
          <div className="mt-10">
            <Link
              to="/my-orders"
              className="inline-flex items-center gap-2 rounded-full border border-[#E6E6E6] px-6 py-3 font-medium text-[#1A1A1A] transition hover:border-[#00B207] hover:text-[#00B207]"
            >
              <ArrowLeft size={18} />
              Back to Orders
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default OrderDetailContentSection;
