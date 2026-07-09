import { Link } from "react-router-dom";
import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import { useWishlist } from "../../Contexts/WishListContext";
import { useCart } from "../../Contexts/CartContext";

const ShopProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
  };

  return (
    <div className="group relative overflow-hidden rounded-[10px] border border-[#E6E6E6] bg-white transition-all duration-300 hover:border-[#2C742F] hover:shadow-[0_12px_32px_rgba(32,181,38,0.12)]">
      {/* Product Image + badges */}
      <div className="relative px-4 pt-5">
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute left-4 top-4 z-10 rounded-[4px] px-3 py-1 text-xs font-medium text-white ${
              product.badgeType === "sale" ? "bg-[#EA4B48]" : "bg-[#1A1A1A]"
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Hover action icons */}
        <div className="absolute right-4 top-4 z-10 flex translate-x-4 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          {/* Wishlist */}
          <button
            type="button"
            onClick={handleToggleWishlist}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
              isWishlisted
                ? "border-[#00B207] bg-[#00B207] text-white"
                : "border-[#E6E6E6] bg-white text-[#1A1A1A] hover:bg-[#00B207] hover:text-white"
            }`}
          >
            <Heart size={18} className={isWishlisted ? "fill-current" : ""} />
          </button>

          {/* View detail */}
          <Link
            to={`/product/${product.id}`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E6E6E6] bg-white text-[#1A1A1A] transition hover:bg-[#00B207] hover:text-white"
          >
            <Eye size={18} />
          </Link>
        </div>

        {/* Product image */}
        <Link
          to={`/product/${product.id}`}
          className="flex h-[220px] items-center justify-center"
        >
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="border-t border-[#E6E6E6] px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link to={`/product/${product.id}`}>
              <h3 className="truncate text-base font-medium text-[#4D4D4D] transition-colors duration-300 group-hover:text-[#2C742F]">
                {product.name}
              </h3>
            </Link>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="text-lg font-semibold text-[#1A1A1A]">
                ${product.price.toFixed(2)}
              </span>

              {product.oldPrice && (
                <span className="text-sm text-[#999999] line-through">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="mt-2 flex items-center gap-[2px]">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  className={
                    index < product.rating
                      ? "fill-[#FF8A00] text-[#FF8A00]"
                      : "fill-[#E6E6E6] text-[#E6E6E6]"
                  }
                />
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={product.outOfStock}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition ${
              product.outOfStock
                ? "cursor-not-allowed bg-[#F2F2F2] text-[#B3B3B3]"
                : "bg-[#F2F2F2] text-[#1A1A1A] hover:bg-[#00B207] hover:text-white"
            }`}
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopProductCard;
