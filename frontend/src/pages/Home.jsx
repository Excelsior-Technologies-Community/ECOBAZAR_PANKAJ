import React from "react";
import Navbar from "../Components/Navbar";
import HeroSection from "../Components/HomeComponents/HeroSection";
import FeaturedProducts from "../Components/HomeComponents/featuredProducts";
import ProductShowcase from "../Components/HomeComponents/ProductShowCase";
import TopCategories from "../Components/HomeComponents/TopCategories";
import PromoBanners from "../Components/HomeComponents/PromoBanners";
import Testimonals from "../Components/HomeComponents/Testimonals";
import InstagramSection from "../Components/HomeComponents/InstagramSection";
import NewsletterSection from "../Components/HomeComponents/NewsLetterSection";
import Footer from "../Components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturedProducts />
      <ProductShowcase />
      <TopCategories />
      <PromoBanners />
      <Testimonals />
      <InstagramSection />
      <NewsletterSection />
      <Footer />
    </>
  );
}

export default Home;
