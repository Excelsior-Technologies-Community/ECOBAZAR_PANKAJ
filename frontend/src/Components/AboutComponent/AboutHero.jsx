import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import bg from "../../assets/HeroDetail.jpg";
const AboutHero = () => {
  return (
    <section
      className="relative h-[180px] overflow-hidden bg-cover bg-center md:h-[340px]"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45"></div>

      {/* Content */}
      <div className="relative mx-auto flex h-full max-w-7xl items-center px-4">
        <div>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            About Us
          </h1>

          <div className="flex items-center gap-2 text-sm text-white">
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-[#00B207]"
            >
              <Home size={16} />
              Home
            </Link>

            <ChevronRight size={16} />

            <span className="text-[#00B207]">About</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
