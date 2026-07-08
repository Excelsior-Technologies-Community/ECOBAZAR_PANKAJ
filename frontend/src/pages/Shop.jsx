import { useMemo, useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";

import ShopHeroSection from "../Components/ShopComponents/ShopHeroSection";
import ShopProductCard from "../Components/ShopComponents/ShopProductCard";

import { products } from "../data/product.js";

const categoryOptions = [
  "All",
  "Vegetables",
  "Fresh Fruit",
  "River Fish",
  "Meat",
  "Drinks",
  "Snacks",
];

const priceOptions = [
  "All Prices",
  "Under $10",
  "$10 - $20",
  "$20 - $50",
  "Above $50",
];

const ratingOptions = [
  "All Ratings",
  "5 Star",
  "4 Star & Up",
  "3 Star & Up",
  "2 Star & Up",
];

const sortOptions = [
  "Latest",
  "Price: Low to High",
  "Price: High to Low",
  "Name: A-Z",
  "Rating",
];

const showOptions = [12, 16, 20, 24];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All Prices");
  const [selectedRating, setSelectedRating] = useState("All Ratings");
  const [sortBy, setSortBy] = useState("Latest");
  const [showCount, setShowCount] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      );
    }

    // price filter
    if (selectedPrice === "Under $10") {
      filtered = filtered.filter((product) => product.price < 10);
    } else if (selectedPrice === "$10 - $20") {
      filtered = filtered.filter(
        (product) => product.price >= 10 && product.price <= 20,
      );
    } else if (selectedPrice === "$20 - $50") {
      filtered = filtered.filter(
        (product) => product.price > 20 && product.price <= 50,
      );
    } else if (selectedPrice === "Above $50") {
      filtered = filtered.filter((product) => product.price > 50);
    }

    // rating filter
    if (selectedRating === "5 Star") {
      filtered = filtered.filter((product) => product.rating === 5);
    } else if (selectedRating === "4 Star & Up") {
      filtered = filtered.filter((product) => product.rating >= 4);
    } else if (selectedRating === "3 Star & Up") {
      filtered = filtered.filter((product) => product.rating >= 3);
    } else if (selectedRating === "2 Star & Up") {
      filtered = filtered.filter((product) => product.rating >= 2);
    }

    // sorting
    if (sortBy === "Price: Low to High") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "Name: A-Z") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "Rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [selectedCategory, selectedPrice, selectedRating, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / showCount) || 1;

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * showCount;
    return filteredProducts.slice(startIndex, startIndex + showCount);
  }, [filteredProducts, currentPage, showCount]);

  const clearCategory = () => setSelectedCategory("All");
  const clearPrice = () => setSelectedPrice("All Prices");
  const clearRating = () => setSelectedRating("All Ratings");

  return (
    <>
      <ShopHeroSection />

      <section className="px-4 pb-12 lg:pb-16">
        <div className="mx-auto max-w-[1320px]">
          {/* ===== Top Filter + Sort Row ===== */}
          <div className="rounded-[10px] border border-[#E6E6E6] bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              {/* Left Filters */}
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="h-[46px] min-w-[200px] appearance-none rounded-full border border-[#E6E6E6] bg-white px-5 pr-11 text-sm text-[#4D4D4D] outline-none transition focus:border-[#00B207]"
                  >
                    {categoryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option === "All" ? "Select Category" : option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#808080]"
                  />
                </div>

                <div className="relative">
                  <select
                    value={selectedPrice}
                    onChange={(e) => {
                      setSelectedPrice(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="h-[46px] min-w-[180px] appearance-none rounded-full border border-[#E6E6E6] bg-white px-5 pr-11 text-sm text-[#4D4D4D] outline-none transition focus:border-[#00B207]"
                  >
                    {priceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option === "All Prices" ? "Select Price" : option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#808080]"
                  />
                </div>

                <div className="relative">
                  <select
                    value={selectedRating}
                    onChange={(e) => {
                      setSelectedRating(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="h-[46px] min-w-[180px] appearance-none rounded-full border border-[#E6E6E6] bg-white px-5 pr-11 text-sm text-[#4D4D4D] outline-none transition focus:border-[#00B207]"
                  >
                    {ratingOptions.map((option) => (
                      <option key={option} value={option}>
                        {option === "All Ratings" ? "Select Rating" : option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#808080]"
                  />
                </div>
              </div>

              {/* Right Sort */}
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap xl:justify-end">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-[46px] min-w-[170px] appearance-none rounded-full border border-[#E6E6E6] bg-white px-5 pr-11 text-sm text-[#4D4D4D] outline-none transition focus:border-[#00B207]"
                  >
                    {sortOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#808080]"
                  />
                </div>

                <div className="relative">
                  <select
                    value={showCount}
                    onChange={(e) => {
                      setShowCount(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="h-[46px] min-w-[120px] appearance-none rounded-full border border-[#E6E6E6] bg-white px-5 pr-11 text-sm text-[#4D4D4D] outline-none transition focus:border-[#00B207]"
                  >
                    {showOptions.map((option) => (
                      <option key={option} value={option}>
                        Show: {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#808080]"
                  />
                </div>
              </div>
            </div>

            {/* ===== Active Filter Row ===== */}
            <div className="mt-4 flex flex-col gap-3 border-t border-[#E6E6E6] pt-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-sm font-medium text-[#1A1A1A]">
                  <SlidersHorizontal size={16} className="text-[#00B207]" />
                  <span>Active Filters:</span>
                </div>

                {selectedCategory !== "All" && (
                  <button
                    onClick={clearCategory}
                    className="inline-flex items-center gap-2 rounded-full border border-[#E6E6E6] bg-white px-4 py-2 text-sm text-[#4D4D4D] transition hover:border-[#00B207] hover:text-[#00B207]"
                  >
                    {selectedCategory}
                    <X size={14} />
                  </button>
                )}

                {selectedPrice !== "All Prices" && (
                  <button
                    onClick={clearPrice}
                    className="inline-flex items-center gap-2 rounded-full border border-[#E6E6E6] bg-white px-4 py-2 text-sm text-[#4D4D4D] transition hover:border-[#00B207] hover:text-[#00B207]"
                  >
                    {selectedPrice}
                    <X size={14} />
                  </button>
                )}

                {selectedRating !== "All Ratings" && (
                  <button
                    onClick={clearRating}
                    className="inline-flex items-center gap-2 rounded-full border border-[#E6E6E6] bg-white px-4 py-2 text-sm text-[#4D4D4D] transition hover:border-[#00B207] hover:text-[#00B207]"
                  >
                    {selectedRating}
                    <X size={14} />
                  </button>
                )}
              </div>

              <p className="text-sm text-[#808080]">
                <span className="font-semibold text-[#1A1A1A]">
                  {filteredProducts.length}
                </span>{" "}
                Results Found
              </p>
            </div>
          </div>

          {/* ===== Product Grid ===== */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedProducts.map((product) => (
              <ShopProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* ===== Empty State ===== */}
          {paginatedProducts.length === 0 && (
            <div className="mt-10 rounded-[12px] border border-dashed border-[#D9D9D9] bg-[#FAFAFA] px-6 py-12 text-center">
              <h3 className="text-xl font-semibold text-[#1A1A1A]">
                No products found
              </h3>
              <p className="mt-2 text-[#808080]">
                Try changing category, price or rating filters.
              </p>
            </div>
          )}

          {/* ===== Pagination ===== */}
          {filteredProducts.length > 0 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="flex h-11 min-w-[44px] items-center justify-center rounded-full border border-[#E6E6E6] px-4 text-sm font-medium text-[#4D4D4D] transition hover:border-[#00B207] hover:text-[#00B207]"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                const isActive = currentPage === page;

                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-medium transition ${
                      isActive
                        ? "bg-[#00B207] text-white"
                        : "border border-[#E6E6E6] text-[#4D4D4D] hover:border-[#00B207] hover:text-[#00B207]"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="flex h-11 min-w-[44px] items-center justify-center rounded-full border border-[#E6E6E6] px-4 text-sm font-medium text-[#4D4D4D] transition hover:border-[#00B207] hover:text-[#00B207]"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Shop;
