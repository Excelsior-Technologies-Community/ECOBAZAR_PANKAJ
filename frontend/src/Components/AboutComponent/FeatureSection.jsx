import {
  Leaf,
  Headphones,
  MessageCircle,
  ShieldCheck,
  Truck,
  PackageCheck,
} from "lucide-react";
const features = [
  {
    icon: Leaf,
    title: "100% Organic Food",
    desc: "Healthy & fresh products from trusted farms.",
  },
  {
    icon: Headphones,
    title: "Great Support 24/7",
    desc: "Friendly customer support whenever you need.",
  },
  {
    icon: MessageCircle,
    title: "Customer Feedback",
    desc: "Thousands of happy customers trust us.",
  },
  {
    icon: ShieldCheck,
    title: "100% Secure Payment",
    desc: "Fast and secure payment methods.",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    desc: "Free delivery on eligible orders.",
  },
  {
    icon: PackageCheck,
    title: "Fresh Products",
    desc: "Delivered directly from the farm.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-[#F8F9FA] py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-[#1A1A1A]">
            Why Choose EcoBazar?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            We deliver fresh organic products with quality, trust, and excellent
            customer service.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F5E9] transition group-hover:bg-[#00B207]">
                  <Icon
                    size={30}
                    className="text-[#00B207] transition group-hover:text-white"
                  />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-[#1A1A1A]">
                  {feature.title}
                </h3>

                <p className="leading-7 text-gray-500">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
