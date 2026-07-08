import { useState } from "react";
import { useCart } from "../../Context/CartContext";

const CheckoutContentSection = () => {
  const { cartItems, cartSubtotal } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cod");

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
                    placeholder="Email"
                    className="h-[52px] w-full rounded-[8px] border border-[#E6E6E6] px-4 text-sm outline-none transition placeholder:text-[#999999] focus:border-[#00B207]"
                  />
                </div>

                {/* Row 2 */}
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#1A1A1A]">
                      Country / Region
                    </label>
                    <select className="h-[52px] w-full rounded-[8px] border border-[#E6E6E6] px-4 text-sm text-[#808080] outline-none transition focus:border-[#00B207]">
                      <option value="">Select</option>
                      <option value="india">India</option>
                      <option value="usa">USA</option>
                      <option value="uk">United Kingdom</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#1A1A1A]">
                      States
                    </label>
                    <select className="h-[52px] w-full rounded-[8px] border border-[#E6E6E6] px-4 text-sm text-[#808080] outline-none transition focus:border-[#00B207]">
                      <option value="">Selects</option>
                      <option value="gujarat">Gujarat</option>
                      <option value="maharashtra">Maharashtra</option>
                      <option value="delhi">Delhi</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#1A1A1A]">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      placeholder="Zip Code"
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
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 accent-[#00B207]"
                  />
                  Cash on Delivery
                </label>

                <label className="flex cursor-pointer items-center gap-3 text-sm text-[#4D4D4D]">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 accent-[#00B207]"
                  />
                  Paypal
                </label>

                <label className="flex cursor-pointer items-center gap-3 text-sm text-[#4D4D4D]">
                  <input
                    type="radio"
                    name="payment"
                    value="amazon"
                    checked={paymentMethod === "amazon"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 accent-[#00B207]"
                  />
                  Amazon Pay
                </label>
              </div>
            </div>

            {/* Button */}
            <button
              className={`mt-8 flex h-[52px] w-full items-center justify-center rounded-full px-6 text-sm font-semibold text-white transition ${
                cartItems.length === 0
                  ? "cursor-not-allowed bg-[#BDBDBD]"
                  : "bg-[#00B207] hover:bg-green-700"
              }`}
              disabled={cartItems.length === 0}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutContentSection;
