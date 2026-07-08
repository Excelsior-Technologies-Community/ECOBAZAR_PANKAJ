import { ChevronRight, Home } from "lucide-react";
import heroImg from "../../assets/shophero.jpg";

const ShopHeroSection = () => {
  return (
    <section className="px-4 pt-6 pb-8 lg:pt-8 lg:pb-10">
      <div className="mx-auto max-w-[1320px]">
        {/* Breadcrumb */}
        <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-[#808080]">
          <Home size={16} className="text-[#808080]" />
          <ChevronRight size={14} />
          <span>Categories</span>
          <ChevronRight size={14} />
          <span className="font-medium text-[#00B207]">Vegetables</span>
        </div>

        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-[12px]">
          {/* Full background image */}
          <img
            src={heroImg}
            alt="Sale of the Month"
            className="h-[260px] w-full object-cover sm:h-[320px] lg:h-[360px]"
          />

          {/* Overlay content */}
          <div className="absolute inset-0 flex items-center justify-end">
            <div className="w-full max-w-[520px] px-6 py-8 sm:px-8 md:px-10 lg:mr-8 lg:px-12">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/80 sm:text-sm">
                Best Deals
              </p>

              <h1 className="mt-3 text-[30px] font-semibold leading-tight text-white sm:text-[40px] lg:text-[48px]">
                Sale of the Month
              </h1>

              {/* timer removed */}
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#FF8A00] text-center text-white shadow-md">
                  <div>
                    <p className="text-[22px] font-semibold leading-none">
                      56%
                    </p>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-wide">
                      OFF
                    </p>
                  </div>
                </div>

                <p className="max-w-[220px] text-sm leading-6 text-white/75 sm:text-base">
                  Save more on fresh vegetables and healthy organic food.
                </p>
              </div>

              <button className="mt-7 inline-flex items-center rounded-full bg-[#00B207] px-7 py-3 text-sm font-semibold text-white transition hover:bg-green-700 sm:px-8 sm:py-4 sm:text-base">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopHeroSection;
