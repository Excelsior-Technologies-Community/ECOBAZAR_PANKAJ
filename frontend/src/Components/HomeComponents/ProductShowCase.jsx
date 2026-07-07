import { Eye, Heart, ShoppingBag, Star, ArrowRight } from "lucide-react";

// -------- product images --------
import appleImg from "../../assets/apple.png";
import maltaImg from "../../assets/orange.png";
import lettuceImg from "../../assets/bengan.png";
import eggplantImg from "../../assets/bhindi.png";
import capsicumImg from "../../assets/shimla.png";
import tomatoImg from "../../assets/tomato.png";
import potatoImg from "../../assets/potato.png";
import cornImg from "../../assets/corn.png";
import cauliflowerImg from "../../assets/cauliflower.png";

// -------- right promo image --------
import saleImg from "../../assets/rightbanner1.jpg";

const productColumns = [
  {
    title: "Hot Deals",
    products: [
      {
        id: 1,
        name: "Green Apple",
        price: 14.99,
        oldPrice: null,
        rating: 4,
        image: appleImg,
      },
      {
        id: 2,
        name: "Indian Malta",
        price: 14.99,
        oldPrice: null,
        rating: 4,
        image: maltaImg,
      },
      {
        id: 3,
        name: "Green Lettuce",
        price: 14.99,
        oldPrice: null,
        rating: 4,
        image: lettuceImg,
      },
    ],
  },
  {
    title: "Best Seller",
    products: [
      {
        id: 4,
        name: "Eggplant",
        price: 14.99,
        oldPrice: null,
        rating: 4,
        image: eggplantImg,
      },
      {
        id: 5,
        name: "Red Capsicum",
        price: 14.99,
        oldPrice: 20.99,
        rating: 4,
        image: capsicumImg,
      },
      {
        id: 6,
        name: "Red Tomatos",
        price: 14.99,
        oldPrice: null,
        rating: 4,
        image: tomatoImg,
      },
    ],
  },
  {
    title: "Top Rated",
    products: [
      {
        id: 7,
        name: "Big Potatos",
        price: 14.99,
        oldPrice: null,
        rating: 4,
        image: potatoImg,
      },
      {
        id: 8,
        name: "Corn",
        price: 14.99,
        oldPrice: 20.99,
        rating: 4,
        image: cornImg,
      },
      {
        id: 9,
        name: "Fresh cauliflower",
        price: 14.99,
        oldPrice: null,
        rating: 4,
        image: cauliflowerImg,
      },
    ],
  },
];

const ProductShowcase = () => {
  return (
    <section className="px-4 py-12 lg:py-16">
      <div className="mx-auto max-w-[1320px]">
        {/* equal-height grid on xl */}
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
                    <div className="flex h-[90px] w-[90px] shrink-0 items-center justify-center overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-1 items-center justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate text-[16px] font-medium text-[#4D4D4D] transition-colors duration-300 group-hover:text-[#2C742F] sm:text-[18px]">
                          {product.name}
                        </h3>

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

                        {/* Fixed-height content area so hover doesn't change card size */}
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
                            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00B207] text-white transition hover:bg-green-700">
                              <ShoppingBag size={18} />
                            </button>

                            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E6E6E6] bg-white text-[#1A1A1A] transition hover:bg-[#00B207] hover:text-white">
                              <Eye size={18} />
                            </button>

                            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E6E6E6] bg-white text-[#1A1A1A] transition hover:bg-[#00B207] hover:text-white">
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
