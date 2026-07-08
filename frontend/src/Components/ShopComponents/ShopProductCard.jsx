import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";

const ShopProductCard = ({ product }) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-[10px] border bg-white p-3 transition-all duration-300 hover:border-[#2C742F] hover:shadow-[0_10px_30px_rgba(32,181,38,0.12)] ${
        product.outOfStock ? "border-[#E6E6E6]" : "border-[#E6E6E6]"
      }`}
    >
      {/* Badge */}
      {product.badge && (
        <span
          className={`absolute left-3 top-3 z-10 rounded-md px-3 py-1 text-xs font-medium text-white ${
            product.badgeType === "sale" ? "bg-[#EA4B48]" : "bg-[#1A1A1A]"
          }`}
        >
          {product.badge}
        </span>
      )}

      {/* Hover icons */}
      {!product.outOfStock && (
        <div className="absolute right-3 top-3 z-10 flex translate-x-4 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F2F2F2] bg-white text-[#1A1A1A] shadow-sm transition hover:bg-[#00B207] hover:text-white">
            <Heart size={18} />
          </button>
          <Link to={`/product/${product.id}`}>
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F2F2F2] bg-white text-[#1A1A1A] shadow-sm transition hover:bg-[#00B207] hover:text-white">
              <Eye size={18} />
            </button>
          </Link>
        </div>
      )}

      {/* Image */}
      <div className="flex min-h-[220px] items-center justify-center">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className={`max-h-[210px] w-full object-contain ${
              product.outOfStock ? "opacity-60 grayscale-[20%]" : ""
            }`}
          />
        </Link>
      </div>

      {/* Content */}
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3
            className={`text-sm font-medium sm:text-base ${
              product.outOfStock
                ? "text-[#999999]"
                : "text-[#4D4D4D] group-hover:text-[#2C742F]"
            }`}
          >
            {product.name}
          </h3>

          <div className="mt-1 flex flex-wrap items-center gap-2">
            <p
              className={`text-lg font-semibold ${
                product.outOfStock ? "text-[#999999]" : "text-[#1A1A1A]"
              }`}
            >
              ${product.price.toFixed(2)}
            </p>

            {product.oldPrice && (
              <span className="text-base text-[#999999] line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="mt-1 flex items-center gap-[2px]">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={14}
                className={
                  index < product.rating
                    ? "fill-[#FF8A00] text-[#FF8A00]"
                    : "fill-[#E6E6E6] text-[#E6E6E6]"
                }
              />
            ))}
          </div>
        </div>

        {/* Cart Button */}
        {!product.outOfStock ? (
          <button className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F2F2F2] text-[#1A1A1A] transition group-hover:bg-[#00B207] group-hover:text-white hover:bg-[#00B207] hover:text-white">
            <ShoppingBag size={18} />
          </button>
        ) : (
          <button className="mt-1 rounded-full bg-[#F2F2F2] px-4 py-2 text-xs font-medium text-[#999999]">
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
};

export default ShopProductCard;
