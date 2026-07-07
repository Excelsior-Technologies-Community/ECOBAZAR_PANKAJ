import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import user1 from "../../assets/user1.png";
import user2 from "../../assets/user2.png";
import user3 from "../../assets/user3.png";

const testimonials = [
  {
    id: 1,
    name: "Robert Fox",
    role: "Customer",
    image: user1,
    review:
      "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget.",
    rating: 5,
  },
  {
    id: 2,
    name: "Dianne Russell",
    role: "Customer",
    image: user2,
    review:
      "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget.",
    rating: 5,
  },
  {
    id: 3,
    name: "Eleanor Pena",
    role: "Customer",
    image: user3,
    review:
      "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget.",
    rating: 5,
  },
  {
    id: 4,
    name: "Jenny Wilson",
    role: "Customer",
    image: user1,
    review:
      "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget.",
    rating: 5,
  },
];

const Testimonals = () => {
  return (
    <section className="bg-[#EDF2EE] px-4 py-12 lg:py-16">
      <div className="mx-auto max-w-[1320px]">
        {/* Top Heading Row */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-[28px] font-semibold text-[#1A1A1A] sm:text-[34px] lg:text-[40px]">
              Client Testimonial
            </h2>

            <div className="mt-3 flex items-center gap-2">
              <span className="h-[3px] w-3 rounded-full bg-[#D9F1D9]"></span>
              <span className="h-[3px] w-8 rounded-full bg-[#00B207]"></span>
              <span className="h-[3px] w-3 rounded-full bg-[#D9F1D9]"></span>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button className="testimonial-prev flex h-11 w-11 items-center justify-center rounded-full border border-[#E6E6E6] bg-white text-[#1A1A1A] transition hover:bg-[#00B207] hover:text-white">
              <ArrowLeft size={18} />
            </button>

            <button className="testimonial-next flex h-11 w-11 items-center justify-center rounded-full bg-[#00B207] text-white transition hover:bg-green-700">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: ".testimonial-prev",
            nextEl: ".testimonial-next",
          }}
          pagination={{
            el: ".testimonial-pagination",
            clickable: true,
          }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
          className="testimonial-swiper"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="rounded-[10px] bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.06)] sm:p-7">
                {/* Quote Icon */}
                <div className="mb-4 text-[#84D187]">
                  <Quote size={42} strokeWidth={1.5} />
                </div>

                {/* Review */}
                <p className="text-[15px] leading-7 text-[#666666] sm:text-base">
                  {item.review}
                </p>

                {/* Bottom user row */}
                <div className="mt-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-14 w-14 rounded-full object-cover"
                    />

                    <div>
                      <h3 className="text-[18px] font-semibold text-[#1A1A1A]">
                        {item.name}
                      </h3>
                      <p className="text-sm text-[#999999]">{item.role}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-[2px]">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        className={
                          index < item.rating
                            ? "fill-[#FF8A00] text-[#FF8A00]"
                            : "fill-[#E6E6E6] text-[#E6E6E6]"
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination dots */}
        <div className="testimonial-pagination mt-8 flex items-center justify-center"></div>
      </div>

      {/* custom pagination style */}
      <style>{`
        .testimonial-pagination .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #b7d7b8;
          opacity: 1;
          margin: 0 5px !important;
          border-radius: 999px;
          transition: all 0.3s ease;
        }

        .testimonial-pagination .swiper-pagination-bullet-active {
          width: 24px;
          background: #00B207;
        }
      `}</style>
    </section>
  );
};

export default Testimonals;
