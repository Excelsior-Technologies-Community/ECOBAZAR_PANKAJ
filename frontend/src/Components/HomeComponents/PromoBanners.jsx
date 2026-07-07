import { ArrowRight } from "lucide-react";

import banner1 from "../../assets/b1.jpg";
import banner2 from "../../assets/b2.jpg";
import banner3 from "../../assets/b3.jpg";

const banners = [
  {
    id: 1,
    subtitle: "Best Deals",
    title: "Sale of the Month",
    highlight: "Up to 56% OFF",
    desc: "Free shipping on all your order",
    image: banner1,
  },
  {
    id: 2,
    subtitle: "85% Fat Free",
    title: "Low-Fat Meat",
    highlight: "Started at $79.99",
    desc: "",
    image: banner2,
  },
  {
    id: 3,
    subtitle: "Summer Sale",
    title: "100% Fresh Fruit",
    highlight: "64% OFF",
    desc: "",
    image: banner3,
  },
];

const PromoBanners = () => {
  return (
    <section className="px-4 py-12 lg:py-16">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {banners.map((banner) => {
            const isFirst = banner.id === 1;
            const isSecond = banner.id === 2;
            const isThird = banner.id === 3;

            return (
              <div
                key={banner.id}
                className="relative min-h-[420px] overflow-hidden rounded-[12px] lg:min-h-[490px]"
              >
                {/* Background image */}
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Overlay */}
                {isFirst && (
                  <div className="absolute inset-0 bg-black/10"></div>
                )}
                {isSecond && (
                  <div className="absolute inset-0 bg-black/40"></div>
                )}
                {isThird && (
                  <div className="absolute inset-0 bg-transparent"></div>
                )}

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col items-center px-6 py-8 text-center sm:px-8">
                  {/* Subtitle */}
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.08em] sm:text-sm ${
                      isThird ? "text-[#1A1A1A]" : "text-white"
                    }`}
                  >
                    {banner.subtitle}
                  </p>

                  {/* Title */}
                  <h3
                    className={`mt-4 text-[32px] font-semibold leading-tight sm:text-[38px] lg:text-[44px] ${
                      isThird ? "text-[#1A1A1A]" : "text-white"
                    }`}
                  >
                    {banner.title}
                  </h3>

                  {/* Highlight */}
                  <div className="mt-4">
                    {isThird ? (
                      <div className="flex flex-wrap items-center justify-center gap-1">
                        <span className="text-[18px] font-medium text-[#1A1A1A] sm:text-[28px]">
                          Up to
                        </span>
                        <span className="rounded-md bg-[#1A1A1A] px-3 py-1 text-[20px] font-semibold text-[#FCC900] sm:text-[24px]">
                          {banner.highlight}
                        </span>
                      </div>
                    ) : (
                      <p
                        className={`text-[22px] font-medium sm:text-[28px] ${
                          isFirst || isSecond ? "text-white" : "text-[#1A1A1A]"
                        }`}
                      >
                        {banner.highlight}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  {banner.desc && (
                    <p
                      className={`mt-2 text-sm sm:text-base ${
                        isFirst || isSecond ? "text-white/80" : "text-[#4D4D4D]"
                      }`}
                    >
                      {banner.desc}
                    </p>
                  )}

                  {/* Button */}
                  <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#00B207] shadow-sm transition hover:bg-[#00B207] hover:text-white sm:px-8 sm:py-4 sm:text-base">
                    Shop Now
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
