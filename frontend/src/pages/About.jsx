import React from "react";
import AboutHero from "../Components/AboutComponent/AboutHero";
import TrustedSection from "../Components/AboutComponent/TrustedSection";
import FeaturesSection from "../Components/AboutComponent/FeatureSection";
import DeliverySection from "../Components/AboutComponent/DeliverySection";
import TeamSection from "../Components/AboutComponent/TeamSection";
import TestimonialSection from "../Components/AboutComponent/TestimonialSection";

function About() {
  return (
    <div>
      <AboutHero />
      <TrustedSection />
      <FeaturesSection />
      <DeliverySection />
      <TeamSection />
      <TestimonialSection />
    </div>
  );
}

export default About;
