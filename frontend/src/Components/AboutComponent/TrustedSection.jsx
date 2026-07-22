import React from "react";
import farmerImg from "../../assets/farmerbg.jpg";
const TrustedSection = () => {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 lg:flex-row">
        {/* Left Content */}

        <div className="w-full lg:w-1/2">
          <h2 className="mb-6 text-4xl font-bold leading-tight text-[#1A1A1A]">
            100% Trusted
            <br />
            Organic Food Store
          </h2>

          <p className="mb-4 text-lg font-medium text-gray-700">
            Healthy organic foods delivered directly from trusted local farms.
          </p>

          <p className="leading-8 text-gray-500">
            We believe fresh food should be available to everyone. Our products
            are carefully selected to ensure quality, freshness, and the best
            taste for your family.
          </p>
        </div>

        {/* Right Image */}

        <div className="relative w-full lg:w-1/2">
          <img
            src={farmerImg}
            alt="Farmer"
            className="w-full rounded-xl object-cover shadow-xl"
          />

          {/* Floating Card */}

          <div className="absolute bottom-6 left-6 rounded-xl bg-white px-6 py-4 shadow-xl">
            <h3 className="text-3xl font-bold text-[#00B207]">25+</h3>

            <p className="mt-1 text-sm text-gray-500">Years of Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedSection;
