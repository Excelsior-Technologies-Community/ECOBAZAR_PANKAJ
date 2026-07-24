import { Search, Calendar } from "lucide-react";
import blog3 from "../../assets/blog3.png";
import blog4 from "../../assets/blog4.png";
import blog5 from "../../assets/blog5.png";
import blog6 from "../../assets/blog6.png";
import React from "react";
const categories = [
  { name: "Fresh Fruit", count: 134 },
  { name: "Vegetables", count: 150 },
  { name: "Cooking", count: 54 },
  { name: "Snacks", count: 47 },
  { name: "Beverages", count: 43 },
  { name: "Beauty & Health", count: 38 },
  { name: "Bread & Bakery", count: 15 },
];

const tags = [
  "Healthy",
  "Low Fat",
  "Vegetarian",
  "Bread",
  "Kid Foods",
  "Vitamins",
  "Snacks",
  "Tiffin",
  "Meat",
  "Lunch",
  "Dinner",
];

const recentPosts = [
  {
    title: "Curabitur porttitor orci eget neque.",
    date: "Apr 25, 2021",
    image: blog3, // Add your image
  },
  {
    title: "Donec mattis arcu faucibus suscipit.",
    date: "Apr 25, 2021",
    image: blog4,
  },
  {
    title: "Quisque posuere tempus rutrum.",
    date: "Apr 25, 2021",
    image: blog5,
  },
];
const BlogSidebar = () => {
  return (
    <div className="space-y-10">
      {/* Search */}

      <div>
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border py-3 pl-11 pr-4 outline-none focus:border-[#00B207]"
          />
        </div>
      </div>

      {/* Categories */}

      <div>
        <h2 className="mb-5 text-xl font-semibold">Top Categories</h2>

        <div className="space-y-4">
          {categories.map((item) => (
            <button
              key={item.name}
              className="flex w-full justify-between text-gray-600 transition hover:text-[#00B207]"
            >
              <span>{item.name}</span>

              <span>({item.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}

      <div>
        <h2 className="mb-5 text-xl font-semibold">Popular Tags</h2>

        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <button
              key={tag}
              className="rounded-full bg-gray-100 px-4 py-2 text-sm transition hover:bg-[#00B207] hover:text-white"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery */}

      <div>
        <h2 className="mb-5 text-xl font-semibold">Our Gallery</h2>

        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <img
              key={item}
              src=""
              alt=""
              className="aspect-square rounded-lg bg-gray-200 object-cover"
            />
          ))}
        </div>
      </div>

      {/* Recent Posts */}

      <div>
        <h2 className="mb-5 text-xl font-semibold">Recently Added</h2>

        <div className="space-y-5">
          {recentPosts.map((post, index) => (
            <div key={index} className="flex gap-4">
              <img
                src={post.image}
                alt=""
                className="h-20 w-20 rounded-lg object-cover"
              />

              <div>
                <h3 className="line-clamp-2 text-sm font-medium">
                  {post.title}
                </h3>

                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                  <Calendar size={14} />

                  {post.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
