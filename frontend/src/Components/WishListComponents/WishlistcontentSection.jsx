import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useWishlist } from "../../Contexts/WishListContext";
import { useCart } from "../../Contexts/CartContext";

const WishlistcontentSection = () => {
  const { wishlistItems, removeWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    if (product.outOfStock) return;

    addToCart(product.productId, 1);
  };
  return (
    <section className="px-4 py-12 lg:py-16">
      <div className="mx-auto max-w-[1320px]">
        <div className="overflow-hidden rounded-[10px] border border-[#E6E6E6] bg-white">
          {/* ===== Desktop / Tablet Table Header ===== */}
          <div className="hidden grid-cols-[1.8fr_0.8fr_0.8fr_1fr_50px] items-center border-b border-[#E6E6E6] px-6 py-4 md:grid">
            <h3 className="text-sm font-medium uppercase tracking-[0.03em] text-[#808080]">
              Product
            </h3>
            <h3 className="text-sm font-medium uppercase tracking-[0.03em] text-[#808080]">
              Price
            </h3>
            <h3 className="text-sm font-medium uppercase tracking-[0.03em] text-[#808080]">
              Stock Status
            </h3>
            <h3 className="text-sm font-medium uppercase tracking-[0.03em] text-[#808080]">
              Actions
            </h3>
            <div></div>
          </div>

          {/* ===== Empty State ===== */}
          {wishlistItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
              <h2 className="text-[26px] font-semibold text-[#1A1A1A] sm:text-[32px]">
                Your wishlist is empty
              </h2>
              <p className="mt-3 max-w-[520px] text-sm text-[#666666] sm:text-base">
                Save your favorite products here and come back anytime to add
                them to your cart.
              </p>

              <Link
                to="/shop"
                className="mt-8 inline-flex h-[48px] items-center justify-center rounded-full bg-[#00B207] px-7 text-sm font-semibold text-white transition hover:bg-green-700"
              >
                Return to Shop
              </Link>
            </div>
          ) : (
            <>
              {/* ===== Wishlist Items ===== */}
              <div>
                {wishlistItems.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-[#E6E6E6] last:border-b-0"
                  >
                    {/* ================= Desktop / Tablet Row ================= */}
                    <div className="hidden grid-cols-[1.8fr_0.8fr_0.8fr_1fr_50px] items-center gap-4 px-6 py-5 md:grid">
                      {/* Product */}
                      <div className="flex items-center gap-4">
                        <Link
                          to={`/product/${item.productId}`}
                          className="flex h-[90px] w-[90px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-white"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </Link>

                        <div className="min-w-0">
                          <Link to={`/product/${item.productId}`}>
                            <h3 className="truncate text-base font-medium text-[#1A1A1A] transition hover:text-[#00B207]">
                              {item.name}
                            </h3>
                          </Link>
                        </div>
                      </div>

                      {/* Price */}
                      <div>
                        <p className="text-base font-medium text-[#1A1A1A]">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Stock Status */}
                      <div>
                        {item.outOfStock ? (
                          <span className="text-sm font-medium text-[#EA4B48]">
                            Out of Stock
                          </span>
                        ) : (
                          <span className="text-sm font-medium text-[#00B207]">
                            In Stock
                          </span>
                        )}
                      </div>

                      {/* Action */}
                      <div>
                        <button
                          onClick={() => handleAddToCart(item)}
                          disabled={item.outOfStock}
                          className={`inline-flex h-[46px] items-center justify-center rounded-full px-6 text-sm font-semibold transition ${
                            item.outOfStock
                              ? "cursor-not-allowed bg-[#F2F2F2] text-[#B3B3B3]"
                              : "bg-[#00B207] text-white hover:bg-green-700"
                          }`}
                        >
                          Add to Cart
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeWishlist(item.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E6E6E6] text-[#666666] transition hover:border-[#EA4B48] hover:text-[#EA4B48]"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {/* ================= Mobile Card ================= */}
                    <div className="flex flex-col gap-4 px-4 py-5 md:hidden">
                      <div className="flex gap-4">
                        <Link
                          to={`/product/${item.productId}`}
                          className="flex h-[90px] w-[90px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-white"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </Link>

                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <Link
                              to={`/product/${item.productId}`}
                              className="min-w-0"
                            >
                              <h3 className="truncate text-base font-medium text-[#1A1A1A] transition hover:text-[#00B207]">
                                {item.name}
                              </h3>
                            </Link>

                            <button
                              onClick={() => removeWishlist(item.id)}
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E6E6E6] text-[#666666] transition hover:border-[#EA4B48] hover:text-[#EA4B48]"
                            >
                              <X size={16} />
                            </button>
                          </div>

                          <p className="mt-2 text-base font-medium text-[#1A1A1A]">
                            ${item.price.toFixed(2)}
                          </p>

                          <div className="mt-2">
                            {item.outOfStock ? (
                              <span className="text-sm font-medium text-[#EA4B48]">
                                Out of Stock
                              </span>
                            ) : (
                              <span className="text-sm font-medium text-[#00B207]">
                                In Stock
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddToCart(item)}
                        disabled={item.outOfStock}
                        className={`inline-flex h-[46px] items-center justify-center rounded-full px-6 text-sm font-semibold transition ${
                          item.outOfStock
                            ? "cursor-not-allowed bg-[#F2F2F2] text-[#B3B3B3]"
                            : "bg-[#00B207] text-white hover:bg-green-700"
                        }`}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom action */}
              <div className="flex justify-center px-4 py-6">
                <Link
                  to="/shop"
                  className="inline-flex h-[48px] items-center justify-center rounded-full border border-[#E6E6E6] px-7 text-sm font-semibold text-[#1A1A1A] transition hover:border-[#00B207] hover:text-[#00B207]"
                >
                  Continue Shopping
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default WishlistcontentSection;
