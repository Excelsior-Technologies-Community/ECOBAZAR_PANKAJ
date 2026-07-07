import { Eye, Heart, ShoppingBag, Star } from "lucide-react";

import appleImg from "../../assets/apple.png";
import cabbageImg from "../../assets/cabbge.png";
import lettuceImg from "../../assets/cabbge2.png";
import chiliImg from "../../assets/shimla.png";
import cornImg from "../../assets/corn.png";

const products = [
  {
    id: 1,
    name: "Green Apple",
    price: 14.99,
    image: appleImg,
    rating: 4,
  },
  {
    id: 2,
    name: "Chanise Cabbage",
    price: 14.99,
    image: cabbageImg,
    rating: 4,
  },
  {
    id: 3,
    name: "Green Lettuce",
    price: 14.99,
    image: lettuceImg,
    rating: 4,
  },
  {
    id: 4,
    name: "Green Chili",
    price: 14.99,
    image: chiliImg,
    rating: 4,
  },
  {
    id: 5,
    name: "Corn",
    price: 14.99,
    image: cornImg,
    rating: 4,
  },
];

const FeaturedProducts = () => {
  return (
    <section className="px-4 py-12 lg:py-16">
      <div className="mx-auto max-w-[1320px]">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-[28px] font-semibold text-[#1A1A1A] sm:text-[34px] lg:text-[40px]">
            Featured Products
          </h2>

          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="h-[3px] w-8 rounded-full bg-[#D9F1D9]"></span>
            <span className="h-[3px] w-10 rounded-full bg-[#00B207]"></span>
            <span className="h-[3px] w-8 rounded-full bg-[#D9F1D9]"></span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-[10px] border border-[#E6E6E6] bg-white p-3 transition-all duration-300 hover:border-[#2C742F] hover:shadow-[0_10px_30px_rgba(32,181,38,0.12)]"
            >
              {/* Hover icons */}
              <div className="absolute right-3 top-3 z-10 flex translate-x-4 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F2F2F2] bg-white text-[#1A1A1A] shadow-sm transition hover:bg-[#00B207] hover:text-white">
                  <Heart size={18} />
                </button>

                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F2F2F2] bg-white text-[#1A1A1A] shadow-sm transition hover:bg-[#00B207] hover:text-white">
                  <Eye size={18} />
                </button>
              </div>

              {/* Image */}
              <div className="flex min-h-[180px] items-center justify-center sm:min-h-[220px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-[180px] w-full object-contain sm:max-h-[200px]"
                />
              </div>

              {/* Content */}
              <div className="mt-3 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-medium text-[#4D4D4D] sm:text-base">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-lg font-semibold text-[#1A1A1A]">
                    ${product.price.toFixed(2)}
                  </p>

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
                <button className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F2F2F2] text-[#1A1A1A] transition group-hover:bg-[#00B207] group-hover:text-white hover:bg-[#00B207] hover:text-white">
                  <ShoppingBag size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
