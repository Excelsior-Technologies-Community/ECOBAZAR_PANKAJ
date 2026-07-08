import React from "react";
import HeroSection from "../Components/HomeComponents/HeroSection";

import ProductShowcase from "../Components/HomeComponents/ProductShowCase";
import TopCategories from "../Components/HomeComponents/TopCategories";
import PromoBanners from "../Components/HomeComponents/PromoBanners";
import Testimonals from "../Components/HomeComponents/Testimonals";
import InstagramSection from "../Components/HomeComponents/InstagramSection";
import NewsletterSection from "../Components/HomeComponents/NewsLetterSection";
import FeaturedProducts from "../Components/HomeComponents/FeaturedProducts";

function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <ProductShowcase />
      <TopCategories />
      <PromoBanners />
      <Testimonals />
      <InstagramSection />
      <NewsletterSection />
    </>
  );
}

export default Home;
