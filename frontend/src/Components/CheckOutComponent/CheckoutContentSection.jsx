import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Contexts/CartContext";
const CheckoutContentSection = () => {
  const navigate = useNavigate();

  const { cartItems, cartSubtotal, clearCart, fetchCart } = useCart();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    email: "",
    phone: "",
    orderNote: "",
    paymentMethod: "COD",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handlePlaceOrder = async (
    paymentStatus,
    razorpayPaymentId = null,
    razorpayOrderId = null,
  ) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const payload = {
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        address: formData.address,
        zipCode: formData.zipCode,
        orderNote: formData.orderNote,

        paymentMethod: formData.paymentMethod,
        paymentStatus,

        razorpayPaymentId,
        razorpayOrderId,
      };
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.address ||
        !formData.country ||
        !formData.state ||
        !formData.city ||
        !formData.zipCode ||
        !formData.email ||
        !formData.phone
      ) {
        alert("Please fill all required fields");

        return;
      }
      if (cartItems.length === 0) {
        alert("Your cart is empty");

        return;
      }
      const { data } = await axios.post(
        "http://localhost:5000/api/order",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(data.message);

      await fetchCart();

      navigate("/my-orders");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const handleRazorpayPayment = async () => {
    try {
      const token = localStorage.getItem("token");

      // Create Razorpay Order
      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const options = {
        key: data.key,

        amount: data.order.amount,

        currency: data.order.currency,

        name: "EcoBazar",

        description: "Order Payment",

        order_id: data.order.id,

        handler: async function (response) {
          try {
            const token = localStorage.getItem("token");

            const { data } = await axios.post(
              "http://localhost:5000/api/payment/verify",
              response,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );

            if (data.success) {
              await handlePlaceOrder(
                "Paid",
                response.razorpay_payment_id,
                response.razorpay_order_id,
              );
            }
          } catch (error) {
            console.error(error);
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: formData.full_name,
          email: formData.email,
          contact: formData.phone,
        },

        theme: {
          color: "#00B207",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error(error);

      alert("Unable to start payment");
    }
  };
  return (
    <section className="px-4 py-12 lg:py-16">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-8 xl:grid-cols-[1fr_360px]">
          {/* ================= LEFT SIDE ================= */}
          <div>
            {/* ===== Billing Information ===== */}
            <div className="border-b border-[#E6E6E6] pb-10">
              <h2 className="mb-8 text-[32px] font-semibold text-[#1A1A1A]">
                Billing Information
              </h2>

              <div className="space-y-5">
                {/* Row 1 */}
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#1A1A1A]">
                      First name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Your first name"
                      className="h-[52px] w-full rounded-[8px] border border-[#E6E6E6] px-4 text-sm outline-none transition placeholder:text-[#999999] focus:border-[#00B207]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#1A1A1A]">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Your last name"
                      className="h-[52px] w-full rounded-[8px] border border-[#E6E6E6] px-4 text-sm outline-none transition placeholder:text-[#999999] focus:border-[#00B207]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#1A1A1A]">
                      Company Name{" "}
                      <span className="text-[#808080]">(optional)</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company name"
                      className="h-[52px] w-full rounded-[8px] border border-[#E6E6E6] px-4 text-sm outline-none transition placeholder:text-[#999999] focus:border-[#00B207]"
                    />
                  </div>
                </div>

                {/* Street Address */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#1A1A1A]">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street Address"
                    className="h-[52px] w-full rounded-[8px] border border-[#E6E6E6] px-4 text-sm outline-none transition placeholder:text-[#999999] focus:border-[#00B207]"
                  />
                </div>

                {/* Row 2 */}
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#1A1A1A]">
                      Country / Region
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="h-[52px] w-full rounded-[8px] border border-[#E6E6E6] px-4 text-sm text-[#808080] outline-none transition focus:border-[#00B207]"
                    >
                      <option value="">Select</option>
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#1A1A1A]">
                      States
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="h-[52px] w-full rounded-[8px] border border-[#E6E6E6] px-4 text-sm text-[#808080] outline-none transition focus:border-[#00B207]"
                    >
                      <option value="">Select</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#1A1A1A]">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="Zip Code"
                      className="h-[52px] w-full rounded-[8px] border border-[#E6E6E6] px-4 text-sm outline-none transition placeholder:text-[#999999] focus:border-[#00B207]"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#1A1A1A]">
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="h-[52px] w-full rounded-[8px] border border-[#E6E6E6] px-4 text-sm outline-none transition placeholder:text-[#999999] focus:border-[#00B207]"
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#1A1A1A]">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="h-[52px] w-full rounded-[8px] border border-[#E6E6E6] px-4 text-sm outline-none transition placeholder:text-[#999999] focus:border-[#00B207]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#1A1A1A]">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone number"
                      className="h-[52px] w-full rounded-[8px] border border-[#E6E6E6] px-4 text-sm outline-none transition placeholder:text-[#999999] focus:border-[#00B207]"
                    />
                  </div>
                </div>

                {/* Checkbox */}
                <label className="flex items-center gap-3 pt-1 text-sm text-[#4D4D4D]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border border-[#CCCCCC] accent-[#00B207]"
                  />
                  Ship to a different address
                </label>
              </div>
            </div>

            {/* ===== Additional Info ===== */}
            <div className="pt-10">
              <h2 className="mb-8 text-[32px] font-semibold text-[#1A1A1A]">
                Additional Info
              </h2>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#1A1A1A]">
                  Order Notes <span className="text-[#808080]">(Optional)</span>
                </label>
                <textarea
                  rows={6}
                  name="orderNote"
                  value={formData.orderNote}
                  onChange={handleChange}
                  placeholder="Notes about your order, e.g. special notes for delivery"
                  className="w-full rounded-[8px] border border-[#E6E6E6] px-4 py-4 text-sm outline-none transition placeholder:text-[#999999] focus:border-[#00B207]"
                ></textarea>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="h-fit rounded-[12px] border border-[#E6E6E6] bg-white p-6">
            <h2 className="text-[28px] font-medium text-[#1A1A1A]">
              Order Summary
            </h2>

            {/* Product list */}
            <div className="mt-6 space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-sm text-[#808080]">No items in cart.</p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-white">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <p className="truncate text-sm font-medium text-[#1A1A1A]">
                        {item.name}{" "}
                        <span className="font-normal text-[#808080]">
                          x{item.quantity}
                        </span>
                      </p>
                    </div>

                    <span className="text-sm font-semibold text-[#1A1A1A]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Totals */}
            <div className="mt-6 space-y-4 border-t border-[#E6E6E6] pt-6">
              <div className="flex items-center justify-between border-b border-[#E6E6E6] pb-4">
                <span className="text-base text-[#4D4D4D]">Subtotal:</span>
                <span className="text-base font-medium text-[#1A1A1A]">
                  ${cartSubtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#E6E6E6] pb-4">
                <span className="text-base text-[#4D4D4D]">Shipping:</span>
                <span className="text-base font-medium text-[#1A1A1A]">
                  Free
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-base text-[#4D4D4D]">Total:</span>
                <span className="text-[24px] font-semibold text-[#1A1A1A]">
                  ${cartSubtotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-8">
              <h3 className="mb-4 text-[24px] font-medium text-[#1A1A1A]">
                Payment Method
              </h3>

              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-3 text-sm text-[#4D4D4D]">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={formData.paymentMethod === "COD"}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#00B207]"
                  />
                  Cash on Delivery
                </label>

                <label className="flex cursor-pointer items-center gap-3 text-sm text-[#4D4D4D]">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Razorpay"
                    checked={formData.paymentMethod === "Razorpay"}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#00B207]"
                  />
                  RazorPay
                </label>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={async () => {
                if (formData.paymentMethod === "COD") {
                  await handlePlaceOrder("Pending", null, null);
                } else {
                  await handleRazorpayPayment();
                }
              }}
              disabled={loading || cartItems.length === 0}
              className={`mt-8 flex h-[52px] w-full items-center justify-center rounded-full px-6 text-sm font-semibold text-white transition ${
                loading || cartItems.length === 0
                  ? "cursor-not-allowed bg-[#BDBDBD]"
                  : "bg-[#00B207] hover:bg-green-700"
              }`}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutContentSection;
