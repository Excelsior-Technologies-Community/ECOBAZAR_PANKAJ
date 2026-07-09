import { Link } from "react-router-dom";
import { X, Minus, Plus } from "lucide-react";
import { useCart } from "../../Contexts/CartContext.jsx";

const CartContent = () => {
  const { cartItems, removeFromCart, increaseQty, decreaseQty, cartSubtotal } =
    useCart();

  return (
    <section className="px-4 py-12 lg:py-16">
      <div className="mx-auto max-w-[1320px]">
        {/* Page Heading */}
        <div className="mb-10 text-center">
          <h1 className="text-[32px] font-semibold text-[#1A1A1A] sm:text-[40px]">
            My Shopping Cart
          </h1>
        </div>

        {/* ===== Main Grid ===== */}
        <div className="grid gap-8 xl:grid-cols-[1fr_360px]">
          {/* ================= LEFT SIDE ================= */}
          <div className="space-y-6">
            {/* ===== Cart Table ===== */}
            <div className="overflow-hidden rounded-[12px] border border-[#E6E6E6] bg-white">
              {/* Table Head */}
              <div className="hidden grid-cols-[1.8fr_0.8fr_0.9fr_0.8fr_40px] items-center gap-4 border-b border-[#E6E6E6] px-6 py-4 md:grid">
                <p className="text-sm font-medium uppercase tracking-[0.02em] text-[#808080]">
                  Product
                </p>
                <p className="text-sm font-medium uppercase tracking-[0.02em] text-[#808080]">
                  Price
                </p>
                <p className="text-sm font-medium uppercase tracking-[0.02em] text-[#808080]">
                  Quantity
                </p>
                <p className="text-sm font-medium uppercase tracking-[0.02em] text-[#808080]">
                  Subtotal
                </p>
                <div></div>
              </div>

              {/* Table Body */}
              <div>
                {cartItems.length === 0 ? (
                  <div className="px-6 py-14 text-center">
                    <h3 className="text-xl font-semibold text-[#1A1A1A]">
                      Your cart is empty
                    </h3>
                    <p className="mt-2 text-[#808080]">
                      Add some fresh products to your cart to continue shopping.
                    </p>

                    <Link
                      to="/shop"
                      className="mt-6 inline-flex rounded-full bg-[#00B207] px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                    >
                      Go to Shop
                    </Link>
                  </div>
                ) : (
                  cartItems.map((item) => {
                    const itemSubtotal = item.price * item.quantity;

                    return (
                      <div
                        key={item.id}
                        className="border-b border-[#E6E6E6] px-5 py-5 last:border-b-0 sm:px-6"
                      >
                        {/* Desktop Row */}
                        <div className="hidden grid-cols-[1.8fr_0.8fr_0.9fr_0.8fr_40px] items-center gap-4 md:grid">
                          {/* Product */}
                          <div className="flex items-center gap-4">
                            <div className="flex h-[90px] w-[90px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-white">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>

                            <h3 className="text-base font-medium text-[#1A1A1A]">
                              {item.name}
                            </h3>
                          </div>

                          {/* Price */}
                          <p className="text-base font-medium text-[#1A1A1A]">
                            ${item.price.toFixed(2)}
                          </p>

                          {/* Quantity */}
                          <div className="inline-flex h-[46px] w-fit items-center rounded-full border border-[#E6E6E6] px-2">
                            <button
                              onClick={() => decreaseQty(item.id)}
                              className="flex h-8 w-8 items-center justify-center rounded-full text-[#1A1A1A] transition hover:bg-[#F2F2F2]"
                            >
                              <Minus size={16} />
                            </button>

                            <span className="min-w-[36px] text-center text-sm font-medium text-[#1A1A1A]">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => increaseQty(item.id)}
                              className="flex h-8 w-8 items-center justify-center rounded-full text-[#1A1A1A] transition hover:bg-[#F2F2F2]"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          {/* Subtotal */}
                          <p className="text-base font-semibold text-[#1A1A1A]">
                            ${itemSubtotal.toFixed(2)}
                          </p>

                          {/* Remove */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E6E6E6] text-[#808080] transition hover:border-[#EA4B48] hover:text-[#EA4B48]"
                          >
                            <X size={16} />
                          </button>
                        </div>

                        {/* Mobile Card */}
                        <div className="flex flex-col gap-5 md:hidden">
                          <div className="flex gap-4">
                            <div className="flex h-[88px] w-[88px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-white">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>

                            <div className="flex min-w-0 flex-1 flex-col">
                              <div className="flex items-start justify-between gap-3">
                                <h3 className="text-base font-medium text-[#1A1A1A]">
                                  {item.name}
                                </h3>

                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E6E6E6] text-[#808080] transition hover:border-[#EA4B48] hover:text-[#EA4B48]"
                                >
                                  <X size={16} />
                                </button>
                              </div>

                              <p className="mt-2 text-sm text-[#808080]">
                                Price:{" "}
                                <span className="font-medium text-[#1A1A1A]">
                                  ${item.price.toFixed(2)}
                                </span>
                              </p>

                              <p className="mt-1 text-sm text-[#808080]">
                                Subtotal:{" "}
                                <span className="font-semibold text-[#1A1A1A]">
                                  ${itemSubtotal.toFixed(2)}
                                </span>
                              </p>
                            </div>
                          </div>

                          {/* Quantity */}
                          <div className="flex items-center justify-between gap-4">
                            <div className="inline-flex h-[46px] w-fit items-center rounded-full border border-[#E6E6E6] px-2">
                              <button
                                onClick={() => decreaseQty(item.id)}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-[#1A1A1A] transition hover:bg-[#F2F2F2]"
                              >
                                <Minus size={16} />
                              </button>

                              <span className="min-w-[36px] text-center text-sm font-medium text-[#1A1A1A]">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() => increaseQty(item.id)}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-[#1A1A1A] transition hover:bg-[#F2F2F2]"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Bottom Buttons */}
              {cartItems.length > 0 && (
                <div className="flex flex-col gap-4 border-t border-[#E6E6E6] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <Link
                    to="/shop"
                    className="inline-flex h-[48px] items-center justify-center rounded-full bg-[#F2F2F2] px-8 text-sm font-semibold text-[#4D4D4D] transition hover:bg-[#E6E6E6]"
                  >
                    Return to shop
                  </Link>

                  <button className="inline-flex h-[48px] items-center justify-center rounded-full bg-[#F2F2F2] px-8 text-sm font-semibold text-[#4D4D4D] transition hover:bg-[#E6E6E6]">
                    Update Cart
                  </button>
                </div>
              )}
            </div>

            {/* ===== Coupon Code ===== */}
            <div className="rounded-[12px] border border-[#E6E6E6] bg-white px-5 py-6 sm:px-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <h3 className="text-[24px] font-medium text-[#1A1A1A]">
                  Coupon Code
                </h3>

                <div className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-[520px]">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="h-[52px] flex-1 rounded-full border border-[#E6E6E6] px-5 text-sm outline-none transition placeholder:text-[#999999] focus:border-[#00B207]"
                  />

                  <button className="h-[52px] rounded-full bg-[#333333] px-8 text-sm font-semibold text-white transition hover:bg-black">
                    Apply Coupon
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="h-fit rounded-[12px] border border-[#E6E6E6] bg-white p-6">
            <h2 className="text-[28px] font-medium text-[#1A1A1A]">
              Cart Total
            </h2>

            <div className="mt-6 space-y-4">
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

              <div className="flex items-center justify-between pb-2">
                <span className="text-base text-[#4D4D4D]">Total:</span>
                <span className="text-[20px] font-semibold text-[#1A1A1A]">
                  ${cartSubtotal.toFixed(2)}
                </span>
              </div>
            </div>

            <Link
              to="/checkout"
              className={`mt-7 flex h-[52px] w-full items-center justify-center rounded-full px-6 text-sm font-semibold text-white transition ${
                cartItems.length === 0
                  ? "pointer-events-none bg-[#BDBDBD]"
                  : "bg-[#00B207] hover:bg-green-700"
              }`}
            >
              Proceed to checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartContent;
