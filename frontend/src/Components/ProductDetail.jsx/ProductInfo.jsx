import { AiOutlineTwitter } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { useState } from "react";
import { Star, Heart, ShoppingBag, Plus, Minus } from "lucide-react";
import { FaPinterestP } from "react-icons/fa";
import { useCart } from "../../Contexts/CartContext";

const ProductInfoSection = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product.id, 1);
  };
  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!product) return null;

  return (
    <section className="px-4 py-10 lg:py-14">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,620px)_1fr]">
          {/* ===== Left Product Image ===== */}
          <div className="flex min-h-[420px] items-center justify-center overflow-hidden rounded-[12px] border border-[#E6E6E6] bg-white p-6 lg:min-h-[520px]">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[460px] w-full object-contain"
            />
          </div>

          {/* ===== Right Product Info ===== */}
          <div>
            {/* Title + Stock */}
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-[28px] font-semibold leading-tight text-[#1A1A1A] sm:text-[34px] lg:text-[36px]">
                {product.name}
              </h1>

              <span
                className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                  product.outOfStock
                    ? "bg-[#FFF2F2] text-[#EA4B48]"
                    : "bg-[#EAF7E9] text-[#2C742F]"
                }`}
              >
                {product.stockStatus}
              </span>
            </div>

            {/* Rating + reviews + sku */}
            <div className="mt-4 flex flex-col gap-3 border-b border-[#E6E6E6] pb-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-[2px]">
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

                <p className="text-sm text-[#666666]">
                  {product.rating} Star Rating
                </p>

                <p className="text-sm text-[#666666]">
                  <span className="font-medium text-[#1A1A1A]">
                    {product.reviewsCount}
                  </span>{" "}
                  Review{product.reviewsCount > 1 ? "s" : ""}
                </p>
              </div>

              <p className="text-sm text-[#666666]">
                SKU:{" "}
                <span className="font-medium text-[#1A1A1A]">
                  {product.sku}
                </span>
              </p>
            </div>

            {/* Price */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {product.oldPrice && (
                <span className="text-[22px] text-[#B3B3B3] line-through sm:text-[24px]">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}

              <span className="text-[28px] font-semibold text-[#2C742F] sm:text-[32px]">
                ${product.price}
              </span>

              {product.discount && (
                <span className="rounded-full bg-[#FFEBEB] px-4 py-1.5 text-sm font-medium text-[#EA4B48]">
                  {product.discount}
                </span>
              )}
            </div>

            {/* Brand + Share */}
            <div className="mt-6 flex flex-col gap-5 border-b border-[#E6E6E6] pb-6 sm:flex-row sm:items-center sm:justify-between">
              {/* Brand */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-[#1A1A1A]">
                  Brand:
                </span>

                <div className="flex items-center gap-3 rounded-[8px] border border-[#E6E6E6] bg-white px-4 py-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF7E9] text-sm font-semibold text-[#2C742F]">
                    E
                  </div>
                  <span className="text-sm font-medium text-[#1A1A1A]">
                    {product.brand}
                  </span>
                </div>
              </div>

              {/* Share */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-[#1A1A1A]">
                  Share item:
                </span>

                <div className="flex items-center gap-2">
                  <button className="flex h-9 w-9 items-center justify-center rounded-full text-[#4D4D4D] transition hover:bg-[#00B207] hover:text-white">
                    <BsFacebook size={16} />
                  </button>
                  <button className="flex h-9 w-9 items-center justify-center rounded-full text-[#4D4D4D] transition hover:bg-[#00B207] hover:text-white">
                    <AiOutlineTwitter size={16} />
                  </button>
                  <button className="flex h-9 w-9 items-center justify-center rounded-full text-[#4D4D4D] transition hover:bg-[#00B207] hover:text-white">
                    <FaPinterestP size={14} />
                  </button>
                  <button className="flex h-9 w-9 items-center justify-center rounded-full text-[#4D4D4D] transition hover:bg-[#00B207] hover:text-white">
                    <AiOutlineInstagram size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Short Description */}
            <p className="mt-6 text-[15px] leading-7 text-[#666666]">
              {product.shortDescription}
            </p>

            {/* Quantity + Add to cart + Wishlist */}
            <div className="mt-8 flex flex-col gap-4 border-b border-[#E6E6E6] pb-6 lg:flex-row lg:items-center">
              {/* Quantity */}
              <div className="inline-flex h-[52px] w-fit items-center rounded-full border border-[#E6E6E6] px-2">
                <button
                  onClick={decreaseQty}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-[#1A1A1A] transition hover:bg-[#F2F2F2]"
                >
                  <Minus size={18} />
                </button>

                <span className="min-w-[48px] text-center text-base font-medium text-[#1A1A1A]">
                  {quantity}
                </span>

                <button
                  onClick={increaseQty}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-[#1A1A1A] transition hover:bg-[#F2F2F2]"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                className={`flex h-[52px] flex-1 items-center justify-center gap-2 rounded-full px-8 text-base font-semibold transition ${
                  product.outOfStock
                    ? "cursor-not-allowed bg-[#E6E6E6] text-[#999999]"
                    : "bg-[#00B207] text-white hover:bg-green-700"
                }`}
                disabled={product.outOfStock}
              >
                Add to Cart
                <ShoppingBag size={18} />
              </button>

              {/* Wishlist */}
              <button className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#F2F2F2] text-[#2C742F] transition hover:bg-[#EAF7E9]">
                <Heart size={20} />
              </button>
            </div>

            {/* Category + Tags */}
            <div className="mt-6 space-y-3">
              <p className="text-sm text-[#666666]">
                <span className="font-semibold text-[#1A1A1A]">Category:</span>{" "}
                {product.category}
              </p>

              <p className="text-sm leading-7 text-[#666666]">
                <span className="font-semibold text-[#1A1A1A]">Tags:</span>{" "}
                {product.category}, Healthy, Organic, Fresh Vegetable
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInfoSection;
