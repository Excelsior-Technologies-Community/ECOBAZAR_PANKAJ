import { AiOutlineInstagram } from "react-icons/ai";

import insta1 from "../../assets/instagramPost-1.png";
import insta2 from "../../assets/instagramPost-2.png";
import insta3 from "../../assets/instagramPost-3.png";
import insta4 from "../../assets/instagramPost-4.png";
import insta5 from "../../assets/instagramPost-5.png";
import insta6 from "../../assets/instagramPost-6.png";

const instagramPosts = [
  { id: 1, image: insta1 },
  { id: 2, image: insta2 },
  { id: 3, image: insta3 },
  { id: 4, image: insta4 },
  { id: 5, image: insta5 },
  { id: 6, image: insta6 },
];

const InstagramSection = () => {
  return (
    <section className="px-4 py-12 lg:py-16">
      <div className="mx-auto max-w-[1320px]">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-[28px] font-semibold text-[#1A1A1A] sm:text-[34px] lg:text-[40px]">
            Follow us on Instagram
          </h2>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              className="group relative overflow-hidden rounded-[10px]"
            >
              {/* Image */}
              <img
                src={post.image}
                alt={`Instagram post ${post.id}`}
                className="h-[180px] w-full object-cover sm:h-[220px]"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-[#2C742F]/70 opacity-0 transition-all duration-300 group-hover:opacity-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <AiOutlineInstagram size={28} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
