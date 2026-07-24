import React from "react";
import { Link } from "react-router-dom";
import { Home, ChevronRight, SlidersHorizontal } from "lucide-react";

import heroBg from "../assets/HeroDetail.jpg";
import BlogCard from "../Components/BlogComponent/BlogCard";
import BlogSidebar from "../Components/BlogComponent/BlogSidebar";
import { blogs } from "../data/blog.js";

function Blog() {
  return (
    <div>
      <section className="relative h-[280px] overflow-hidden md:h-[340px]">
        <img
          src={heroBg}
          className="absolute inset-0 h-full w-full object-cover"
          alt=""
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4">
          <div>
            <h1 className="mb-4 text-5xl font-bold text-white">Blog</h1>

            <div className="flex items-center gap-2 text-white">
              <Link to="/" className="flex items-center gap-1">
                <Home size={16} />
                Home
              </Link>

              <ChevronRight size={16} />

              <span className="text-[#00B207]">Blog</span>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          {/* Top */}

          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <button className="flex items-center gap-2 rounded-full bg-[#00B207] px-6 py-3 text-white">
              <SlidersHorizontal size={18} />
              Filter
            </button>

            <div className="flex items-center gap-3">
              <span>Sort By :</span>

              <select className="rounded-lg border px-4 py-2">
                <option>Latest</option>

                <option>Oldest</option>

                <option>Popular</option>
              </select>
            </div>

            <p className="text-gray-500">{blogs.length} Results Found</p>
          </div>

          {/* Layout */}

          <div className="grid gap-10 lg:grid-cols-12">
            {/* Sidebar */}

            <aside className="lg:col-span-4">
              <div className="sticky top-28">
                <BlogSidebar />
              </div>
            </aside>

            {/* Blogs */}

            <div className="lg:col-span-8">
              <div className="grid gap-7 md:grid-cols-2">
                {blogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Blog;
