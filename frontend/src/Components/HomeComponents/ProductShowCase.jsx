import { Link } from "react-router-dom";
import { Eye, Heart, ShoppingBag, Star, ArrowRight } from "lucide-react";

import { useCart } from "../../Contexts/CartContext";
import saleImg from "../../assets/rightbanner1.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductShowcase = () => {
  const [products, setproducts] = useState([]);
  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/products");
      setproducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  const productColumns = [
    {
      title: "Hot Deals",
      products: products.slice(0, 3),
    },
    {
      title: "Best Seller",
      products: products.slice(3, 6),
    },
    {
      title: "Top Rated",
      products: products.slice(6, 9),
    },
  ];
  return (
    <section className="px-4 py-12 lg:py-16">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr_1fr_300px] xl:items-stretch">
          {/* ===== Left 3 Columns ===== */}
          {productColumns.map((column) => (
            <div key={column.title} className="flex flex-col">
              <h2 className="mb-5 text-[24px] font-semibold text-[#1A1A1A] sm:text-[28px] lg:text-[32px]">
                {column.title}
              </h2>

              <div className="space-y-4">
                {column.products.map((product) => (
                  <div
                    key={product.id}
                    className="group flex min-h-[112px] items-center gap-4 rounded-[10px] border border-[#E6E6E6] bg-white p-4 transition-colors duration-300 hover:border-[#2C742F] hover:shadow-[0_8px_24px_rgba(32,181,38,0.12)]"
                  >
                    {/* Product Image */}
                    <Link
                      to={`/product/${product.id}`}
                      className="flex h-[90px] w-[90px] shrink-0 items-center justify-center overflow-hidden"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex flex-1 items-center justify-between gap-3">
                      <div className="min-w-0">
                        {/* Product Name */}
                        <Link to={`/product/${product.id}`}>
                          <h3 className="truncate text-[16px] font-medium text-[#4D4D4D] transition-colors duration-300 group-hover:text-[#2C742F] sm:text-[18px]">
                            {product.name}
                          </h3>
                        </Link>

                        {/* Price */}
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <span className="text-[22px] font-semibold leading-none text-[#1A1A1A] sm:text-[24px]">
                            ${product.price.toFixed(2)}
                          </span>

                          {product.oldPrice && (
                            <span className="text-[18px] text-[#999999] line-through sm:text-[20px]">
                              ${product.oldPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* Fixed height area */}
                        <div className="mt-2 h-10">
                          {/* Default stars */}
                          <div className="flex items-center gap-[2px] group-hover:hidden">
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

                          {/* Hover action buttons */}
                          <div className="hidden items-center gap-3 group-hover:flex">
                            {/* Add to cart */}
                            <button
                              type="button"
                              onClick={() => handleAddToCart(product)}
                              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00B207] text-white transition hover:bg-green-700"
                            >
                              <ShoppingBag size={18} />
                            </button>

                            {/* View detail */}
                            <Link
                              to={`/product/${product.id}`}
                              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E6E6E6] bg-white text-[#1A1A1A] transition hover:bg-[#00B207] hover:text-white"
                            >
                              <Eye size={18} />
                            </Link>

                            {/* Wishlist UI only for now */}
                            <button
                              type="button"
                              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E6E6E6] bg-white text-[#1A1A1A] transition hover:bg-[#00B207] hover:text-white"
                            >
                              <Heart size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* ===== Right Promo Banner ===== */}
          <div className="overflow-hidden rounded-[12px] bg-[#F7F7F3] xl:h-full">
            <div className="flex h-full flex-col items-center px-6 py-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#666666]">
                Summer Sale
              </p>

              <h3 className="mt-2 text-[40px] font-semibold leading-none text-[#00B207] sm:text-[48px]">
                75% off
              </h3>

              <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-base font-semibold text-[#00B207] shadow-sm transition hover:bg-[#00B207] hover:text-white sm:px-8 sm:py-4 sm:text-lg">
                Shop Now
                <ArrowRight size={20} />
              </button>

              <div className="mt-6 flex flex-1 items-end justify-center">
                <img
                  src={saleImg}
                  alt="Summer Sale"
                  className="w-full max-w-[240px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
