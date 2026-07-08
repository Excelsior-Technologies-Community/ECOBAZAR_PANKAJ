import { Link } from "react-router-dom";
import { House } from "lucide-react";
import checkoutHeroBg from "../../assets/HeroDetail.jpg";

const CheckOutHero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={checkoutHeroBg}
          alt="Checkout"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="mx-auto flex max-w-[1320px] items-center gap-3 px-4 py-14 sm:py-16 lg:py-20">
          <Link to="/" className="text-white/80 transition hover:text-white">
            <House size={18} />
          </Link>

          <span className="text-white/50">/</span>

          <span className="text-sm font-medium text-[#00B207] sm:text-base">
            Checkout
          </span>
        </div>
      </div>
    </section>
  );
};

export default CheckOutHero;
