import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import { Quote, Star } from "lucide-react";

import customer1 from "../../assets/user1.png";
import customer2 from "../../assets/user2.png";
import customer3 from "../../assets/user3.png";

const testimonials = [
  {
    image: customer1,
    name: "Jenny Wilson",
    role: "Customer",
    review:
      "EcoBazar always delivers fresh vegetables. The quality is amazing and delivery is always on time.",
    rating: 5,
  },
  {
    image: customer2,
    name: "Robert Fox",
    role: "Customer",
    review:
      "Very satisfied with the service. The products are fresh and the support team is excellent.",
    rating: 5,
  },
  {
    image: customer3,
    name: "Kristin Watson",
    role: "Customer",
    review:
      "Affordable prices, fast delivery and premium quality. Highly recommended!",
    rating: 4,
  },
];

const TestimonialSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Heading */}

        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-[#1A1A1A]">
            What Our Customers Say
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Thousands of customers trust EcoBazar for fresh and healthy food.
          </p>
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3500,
          }}
          loop
          spaceBetween={25}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-2xl border bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
                <Quote size={42} className="mb-5 text-[#00B207]" />

                <p className="leading-8 text-gray-500">{item.review}</p>

                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-14 w-14 rounded-full object-cover"
                    />

                    <div>
                      <h3 className="font-semibold text-[#1A1A1A]">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500">{item.role}</p>
                    </div>
                  </div>

                  <div className="flex">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        fill="#FACC15"
                        className="text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
