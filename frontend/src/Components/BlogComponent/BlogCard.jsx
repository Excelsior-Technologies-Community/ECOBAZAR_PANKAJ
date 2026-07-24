import { ArrowRight, Calendar, User, MessageCircle } from "lucide-react";

import { Link } from "react-router-dom";
const BlogCard = ({ blog }) => {
  return (
    <div className="group overflow-hidden rounded-xl border bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Image */}

      <div className="relative overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Date */}

        <div className="absolute bottom-4 left-4 rounded-lg bg-white px-3 py-2 text-center shadow-lg">
          <h3 className="text-lg font-bold text-[#1A1A1A]">{blog.day}</h3>

          <p className="text-xs uppercase text-gray-500">{blog.month}</p>
        </div>
      </div>

      {/* Content */}

      <div className="p-6">
        {/* Meta */}

        <div className="mb-4 flex flex-wrap items-center gap-5 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar size={16} />

            {blog.category}
          </div>

          <div className="flex items-center gap-2">
            <User size={16} />

            {blog.author}
          </div>

          <div className="flex items-center gap-2">
            <MessageCircle size={16} />
            {blog.comments} Comments
          </div>
        </div>

        {/* Title */}

        <h2 className="line-clamp-2 text-xl font-semibold leading-8 text-[#1A1A1A] transition group-hover:text-[#00B207]">
          {blog.title}
        </h2>

        {/* Read More */}

        <Link
          to={`/blog/${blog.slug}`}
          className="mt-6 inline-flex items-center gap-2 font-semibold text-[#00B207]"
        >
          Read More
          <ArrowRight
            size={18}
            className="transition group-hover:translate-x-2"
          />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
