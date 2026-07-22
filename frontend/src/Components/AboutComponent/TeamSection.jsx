import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import team1 from "../../assets/team1.png";
import team2 from "../../assets/team2.png";
import team3 from "../../assets/team3.png";
import team4 from "../../assets/team4.png";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";

const teamMembers = [
  {
    image: team1,
    name: "Jenny Wilson",
    role: "CEO & Founder",
  },
  {
    image: team2,
    name: "Robert Fox",
    role: "Senior Farmer",
  },
  {
    image: team3,
    name: "Kristin Watson",
    role: "Marketing Manager",
  },
  {
    image: team4,
    name: "Esther Howard",
    role: "Quality Manager",
  },
];

const TeamSection = () => {
  return (
    <section className="bg-[#F8F9FA] py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Heading */}

        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-[#1A1A1A]">
            Our Awesome Team
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Meet the passionate people behind EcoBazar who work every day to
            deliver fresh and healthy food.
          </p>
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
          }}
          loop={true}
          spaceBetween={25}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {teamMembers.map((member, index) => (
            <SwiperSlide key={index}>
              <div className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-80 w-full object-cover"
                  />

                  {/* Social Icons */}

                  <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 opacity-0 transition duration-300 group-hover:opacity-100">
                    {[FaFacebook, BsTwitter, FaInstagram, FaLinkedin].map(
                      (Icon, i) => (
                        <button
                          key={i}
                          className="rounded-full bg-white p-2 transition hover:bg-[#00B207] hover:text-white"
                        >
                          <Icon size={18} />
                        </button>
                      ),
                    )}
                  </div>
                </div>

                <div className="p-5 text-center">
                  <h3 className="text-xl font-semibold text-[#1A1A1A]">
                    {member.name}
                  </h3>

                  <p className="mt-2 text-gray-500">{member.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TeamSection;
