import { CheckCircle, ArrowRight } from "lucide-react";
import deliveryImg from "../../assets/deliveryboy.png";
import { Link } from "react-router-dom";

const points = [
  "Fresh organic vegetables directly from farms.",
  "Fast & secure home delivery.",
  "Trusted quality with affordable prices.",
];

const DeliverySection = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-14 px-4 lg:flex-row">
        {/* Left Image */}

        {/* Right Content */}

        <div className="w-full lg:w-1/2">
          <span className="font-semibold uppercase tracking-widest text-[#00B207]">
            Why Choose Us
          </span>

          <h2 className="mt-4 text-4xl font-bold leading-tight text-[#1A1A1A]">
            We Deliver Fresh Organic Food To Your Doorstep
          </h2>

          <p className="mt-6 leading-8 text-gray-500">
            EcoBazar works directly with trusted farmers to provide fresh
            vegetables, fruits and grocery products with quick delivery and
            guaranteed quality.
          </p>

          <div className="mt-8 space-y-5">
            {points.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle size={22} className="mt-1 text-[#00B207]" />

                <p className="text-gray-600">{item}</p>
              </div>
            ))}
          </div>

          <Link
            to="/shop"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#00B207] px-7 py-4 font-semibold text-white transition hover:bg-[#2C742F]"
          >
            Shop Now
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="w-full lg:w-1/2">
          <img src={deliveryImg} alt="Delivery" className="w-full" />
        </div>
      </div>
    </section>
  );
};

export default DeliverySection;
