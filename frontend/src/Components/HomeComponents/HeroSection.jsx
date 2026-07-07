import {
  ArrowRight,
  Truck,
  Headphones,
  BadgeCheck,
  PackageCheck,
} from "lucide-react";
import heroImage from "../../assets/vegetable.png"; // change according to your file name

const features = [
  {
    id: 1,
    icon: Truck,
    title: "Free Shipping",
    desc: "Free shipping on all your order",
  },
  {
    id: 2,
    icon: Headphones,
    title: "Customer Support 24/7",
    desc: "Instant access to Support",
  },
  {
    id: 3,
    icon: BadgeCheck,
    title: "100% Secure Payment",
    desc: "We ensure your money is save",
  },
  {
    id: 4,
    icon: PackageCheck,
    title: "Money-Back Guarantee",
    desc: "30 Days Money-Back Guarantee",
  },
];

const HeroSection = () => {
  return (
    <section className="px-4 pt-6 lg:pt-8">
      <div className="mx-auto max-w-[1320px]">
        {/* Hero Banner */}
        <div className="rounded-[10px] bg-[#EDF2EE] px-5 py-8 sm:px-8 md:px-10 lg:px-[60px] lg:py-[60px]">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Left Content */}
            <div className="max-w-[520px]">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#00B207] sm:text-sm">
                Welcome to shopery
              </p>

              <h1 className="text-[34px] font-semibold leading-tight text-[#1A1A1A] sm:text-[46px] md:text-[56px] lg:text-[64px]">
                Fresh & Healthy
                <br />
                Organic Food
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-2 text-[24px] font-medium text-[#1A1A1A] sm:text-[28px]">
                <span>Sale up to</span>
                <span className="font-semibold text-[#FF8A00]">30% OFF</span>
              </div>

              <p className="mt-3 text-sm text-[#808080] sm:text-base">
                Free shipping on all your order. we deliver, you enjoy
              </p>

              <button className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#00B207] px-7 py-3 text-sm font-semibold text-white transition hover:bg-green-700 sm:px-8 sm:py-4 sm:text-base">
                Shop now
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Right Image */}
            <div className="flex justify-center lg:justify-end">
              <img
                src={heroImage}
                alt="Fresh organic food"
                className="w-full max-w-[620px] object-contain"
              />
            </div>
          </div>
        </div>

        {/* Feature Strip */}
        <div className="relative z-10 mx-auto -mt-6 rounded-[10px] bg-white px-4 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.08)] sm:px-6 md:px-8 lg:-mt-10 lg:w-[94%] lg:px-8 lg:py-7">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="flex items-start gap-4 border-gray-100 xl:border-r xl:pr-6 last:border-r-0"
                >
                  <div className="mt-1 text-[#00B207]">
                    <Icon size={34} strokeWidth={1.7} />
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-[#1A1A1A]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#999999]">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
