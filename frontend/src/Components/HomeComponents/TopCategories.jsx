import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

// category images
import vegImg from "../../assets/veg.png";
import fruitImg from "../../assets/fruits.png";
import fishImg from "../../assets/fish.png";
import meatImg from "../../assets/meat.png";
import drinkImg from "../../assets/soft-drink.png";
import snackImg from "../../assets/snacks.png";

const categories = [
  {
    id: 1,
    name: "Vegetables",
    count: "165 Products",
    image: vegImg,
    active: true,
  },
  {
    id: 2,
    name: "Fresh Fruit",
    count: "137 Products",
    image: fruitImg,
  },
  {
    id: 3,
    name: "River Fish",
    count: "34 Products",
    image: fishImg,
  },
  {
    id: 4,
    name: "Meat",
    count: "165 Products",
    image: meatImg,
  },
  {
    id: 5,
    name: "Water and Drinks",
    count: "48 Products",
    image: drinkImg,
  },
  {
    id: 6,
    name: "Snacks",
    count: "165 Products",
    image: snackImg,
  },
];

const TopCategories = () => {
  return (
    <section className="px-4 py-12 lg:py-16">
      <div className="mx-auto max-w-[1320px]">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-[28px] font-semibold text-[#1A1A1A] sm:text-[34px] lg:text-[40px]">
            Top Category
          </h2>

          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="h-[3px] w-8 rounded-full bg-[#D9F1D9]"></span>
            <span className="h-[3px] w-10 rounded-full bg-[#00B207]"></span>
            <span className="h-[3px] w-8 rounded-full bg-[#D9F1D9]"></span>
          </div>
        </div>

        {/* Slider Wrapper */}
        <div className="relative">
          {/* Prev Button */}
          <button className="category-prev absolute left-0 top-1/2 z-20 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#E6E6E6] bg-white text-[#1A1A1A] shadow-sm transition hover:bg-[#00B207] hover:text-white lg:flex">
            <ChevronLeft size={22} />
          </button>

          {/* Next Button */}
          <button className="category-next absolute right-0 top-1/2 z-20 hidden h-12 w-12 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#E6E6E6] bg-white text-[#1A1A1A] shadow-sm transition hover:bg-[#00B207] hover:text-white lg:flex">
            <ChevronRight size={22} />
          </button>

          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".category-prev",
              nextEl: ".category-next",
            }}
            spaceBetween={20}
            slidesPerView={2}
            breakpoints={{
              480: {
                slidesPerView: 2,
              },
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 4,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id}>
                <div
                  className={`flex min-h-[180px] flex-col items-center justify-center rounded-[10px] border bg-white px-4 py-6 text-center transition-all duration-300 hover:border-[#2C742F] hover:shadow-[0_8px_24px_rgba(32,181,38,0.12)] ${
                    category.active
                      ? "border-[#2C742F] shadow-[0_8px_24px_rgba(32,181,38,0.10)]"
                      : "border-[#E6E6E6]"
                  }`}
                >
                  {/* Icon */}
                  <div className="mb-5 flex h-[80px] w-[80px] items-center justify-center">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Name */}
                  <h3
                    className={`text-[20px] font-semibold ${
                      category.active ? "text-[#2C742F]" : "text-[#1A1A1A]"
                    }`}
                  >
                    {category.name}
                  </h3>

                  {/* Count */}
                  <p className="mt-2 text-[16px] text-[#808080]">
                    {category.count}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Mobile arrows */}
          <div className="mt-6 flex items-center justify-center gap-3 lg:hidden">
            <button className="category-prev flex h-10 w-10 items-center justify-center rounded-full border border-[#E6E6E6] bg-white text-[#1A1A1A] transition hover:bg-[#00B207] hover:text-white">
              <ChevronLeft size={20} />
            </button>
            <button className="category-next flex h-10 w-10 items-center justify-center rounded-full border border-[#E6E6E6] bg-white text-[#1A1A1A] transition hover:bg-[#00B207] hover:text-white">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
