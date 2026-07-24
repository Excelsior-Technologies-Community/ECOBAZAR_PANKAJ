import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  ChevronRight,
  Calendar,
  User,
  MessageCircle,
  Clock,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { blogs } from "../data/blog.js";
import { Quote } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import heroBg from "../assets/HeroDetail.jpg";
import blog1 from "../assets/blog1.png";
import blog2 from "../assets/blog2.png";

function BlogDetail() {
  const { slug } = useParams();
  const blog = blogs.find((item) => item.slug === slug);
  const relatedBlogs = blogs.filter((item) => item.id !== blog.id).slice(0, 3);
  return (
    <div>
      <section className="relative h-[280px] overflow-hidden md:h-[340px]">
        <img
          src={heroBg}
          className="absolute inset-0 h-full w-full object-cover"
          alt=""
        />

        <div className="absolute inset-0 bg-black/45"></div>

        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4">
          <div>
            <h1 className="mb-4 text-5xl font-bold text-white">Blog Details</h1>

            <div className="flex items-center gap-2 text-white">
              <Link
                to="/"
                className="flex items-center gap-1 hover:text-[#00B207]"
              >
                <Home size={16} />
                Home
              </Link>

              <ChevronRight size={16} />

              <Link to="/blog" className="hover:text-[#00B207]">
                Blog
              </Link>

              <ChevronRight size={16} />

              <span className="text-[#00B207]">Blog Details</span>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4">
          {/* Image */}

          <img
            src={blog.image}
            alt={blog.title}
            className="mb-8 h-[500px] w-full rounded-2xl object-cover"
          />

          {/* Meta */}

          <div className="mb-6 flex flex-wrap items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar size={18} />

              {blog.category}
            </div>

            <div className="flex items-center gap-2">
              <User size={18} />

              {blog.author}
            </div>

            <div className="flex items-center gap-2">
              <MessageCircle size={18} />
              {blog.comments} Comments
            </div>

            <div className="flex items-center gap-2">
              <Clock size={18} />

              {blog.readTime}
            </div>
          </div>

          {/* Title */}

          <h1 className="mb-8 text-4xl font-bold leading-tight text-[#1A1A1A]">
            {blog.title}
          </h1>

          {/* Paragraphs */}

          <div className="space-y-6 text-lg leading-9 text-gray-600">
            {blog.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          {/* Quote */}

          <div className="my-12 rounded-2xl border-l-4 border-[#00B207] bg-[#F8FFF8] p-8">
            <Quote size={40} className="mb-5 text-[#00B207]" />

            <p className="text-2xl italic font-medium leading-10 text-[#1A1A1A]">
              "Healthy food is not about strict dietary limitations. It is about
              feeling great, having more energy, improving your health, and
              boosting your mood."
            </p>

            <p className="mt-6 font-semibold text-[#00B207]">— EcoBazar Team</p>
          </div>
          <div className="my-12 grid gap-6 md:grid-cols-2">
            <img
              src={blog1}
              alt=""
              className="h-80 w-full rounded-xl object-cover"
            />

            <img
              src={blog2}
              alt=""
              className="h-80 w-full rounded-xl object-cover"
            />
          </div>
          <div className="space-y-6 text-lg leading-9 text-gray-600">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              tincidunt lorem sed augue porta, quis aliquam magna tristique.
            </p>

            <p>
              Donec eget feugiat odio. Sed luctus lacus sed purus volutpat,
              vitae tincidunt elit malesuada. Suspendisse potenti.
            </p>
          </div>
          <div className="mt-14 flex flex-col gap-8 border-t pt-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Tags */}

            <div className="flex flex-wrap items-center gap-3">
              <span className="font-semibold">Tags:</span>

              {blog.tags.map((tag) => (
                <button
                  key={tag}
                  className="rounded-full bg-gray-100 px-4 py-2 text-sm transition hover:bg-[#00B207] hover:text-white"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Share */}

            <div className="flex items-center gap-3">
              <span className="font-semibold">Share:</span>

              {[FaTwitter, FaFacebook, FaInstagram, FaLinkedin].map(
                (Icon, index) => (
                  <button
                    key={index}
                    className="rounded-full bg-gray-100 p-3 transition hover:bg-[#00B207] hover:text-white"
                  >
                    <Icon size={18} />
                  </button>
                ),
              )}
            </div>
          </div>
          <div className="mt-16 rounded-2xl border bg-[#F8F8F8] p-8">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <img
                src={blog1}
                alt="Author"
                className="h-28 w-28 rounded-full object-cover"
              />

              <div>
                <h3 className="text-2xl font-bold text-[#1A1A1A]">Admin</h3>

                <p className="mt-2 text-[#00B207]">Founder • EcoBazar</p>

                <p className="mt-4 leading-8 text-gray-500">
                  Passionate about healthy living and organic food. Our mission
                  is to provide fresh, natural and high-quality products
                  directly from trusted farms to your home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-20">
        <h2 className="mb-10 text-center text-4xl font-bold">Related Blogs</h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {relatedBlogs.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-xl border bg-white transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt=""
                  className="h-60 w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <p className="mb-3 text-sm text-gray-500">{item.date}</p>

                <h3 className="mb-5 text-xl font-semibold transition group-hover:text-[#00B207]">
                  {item.title}
                </h3>

                <Link
                  to={`/blog/${item.id}`}
                  className="font-semibold text-[#00B207]"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default BlogDetail;
