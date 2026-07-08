import { ChevronRight, Home } from "lucide-react";
import hero from "../../assets/HeroDetail.jpg";
const ProductDetailsHero = ({ product }) => {
  return (
    <section className="relative overflow-hidden bg-[#1A1A1A]">
      {/* Background image / overlay section */}
      <div className="absolute inset-0">
        <img
          src={hero}
          alt="Product banner"
          className="h-full w-full object-cover opacity-35"
        />
      </div>

      <div className="relative px-4 py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-wrap items-center gap-2 text-sm text-white/75">
            <Home size={16} className="text-white/80" />
            <ChevronRight size={14} />

            <span className="transition hover:text-white">Category</span>
            <ChevronRight size={14} />

            <span className="transition hover:text-white">
              {product?.category || "Vegetables"}
            </span>
            <ChevronRight size={14} />

            <span className="font-medium text-[#00B207]">
              {product?.name || "Chinese Cabbage"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsHero;
