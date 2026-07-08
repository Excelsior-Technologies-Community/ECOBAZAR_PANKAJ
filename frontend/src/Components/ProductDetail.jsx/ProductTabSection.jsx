import { useState } from "react";
import { Check, Play, Star } from "lucide-react";
import rightimg from "../../assets/detailsideimg.png";
const ProductTabsSection = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");

  if (!product) return null;

  const tabs = [
    { id: "description", label: "Descriptions" },
    { id: "additional", label: "Additional Information" },
    { id: "feedback", label: "Customer Feedback" },
  ];

  return (
    <section className="px-4 pb-12 lg:pb-16">
      <div className="mx-auto max-w-[1320px]">
        <div className="rounded-[12px] border border-[#E6E6E6] bg-white">
          {/* ===== Tab Buttons ===== */}
          <div className="flex flex-wrap gap-6 border-b border-[#E6E6E6] px-5 pt-5 sm:px-8 lg:justify-center lg:pt-6">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative pb-4 text-sm font-medium transition sm:text-base ${
                    isActive ? "text-[#1A1A1A]" : "text-[#808080]"
                  }`}
                >
                  {tab.label}

                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#00B207]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* ===== Tab Content ===== */}
          <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            {/* ================= DESCRIPTION TAB ================= */}
            {activeTab === "description" && (
              <div className="grid gap-10 xl:grid-cols-[1.1fr_0.9fr]">
                {/* Left Content */}
                <div>
                  <p className="text-[15px] leading-8 text-[#666666]">
                    {product.description}
                  </p>

                  <div className="mt-6 space-y-4">
                    {product.features?.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EAF7E9] text-[#2C742F]">
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <p className="text-[15px] leading-7 text-[#666666]">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>

                  <p className="mt-6 text-[15px] leading-8 text-[#666666]">
                    Nunc non tellus orci. Aliquam dignissim interdum lorem, quis
                    ultricies lacus imperdiet ac. Vestibulum ante ipsum primis
                    in faucibus orci luctus et ultrices posuere cubilia curae.
                  </p>
                </div>

                {/* Right Side */}
                <div className="space-y-6">
                  {/* Video / promo card */}
                  <div className="relative overflow-hidden rounded-[12px] bg-[#F2F2F2]">
                    <img
                      src={rightimg}
                      alt={product.name}
                      className="h-[300px] w-full object-contain p-8"
                    />

                    <button className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#00B207] shadow-lg transition hover:scale-105">
                      <Play size={22} className="ml-1 fill-current" />
                    </button>
                  </div>

                  {/* Feature boxes */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[12px] border border-[#E6E6E6] bg-white p-5">
                      <h4 className="text-base font-semibold text-[#1A1A1A]">
                        100% Organic
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-[#808080]">
                        Carefully selected fresh product directly from trusted
                        farms.
                      </p>
                    </div>

                    <div className="rounded-[12px] border border-[#E6E6E6] bg-white p-5">
                      <h4 className="text-base font-semibold text-[#1A1A1A]">
                        Fast Delivery
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-[#808080]">
                        Fresh groceries packed safely and delivered quickly to
                        your door.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= ADDITIONAL INFO TAB ================= */}
            {activeTab === "additional" && (
              <div className="mx-auto max-w-[900px]">
                <div className="overflow-hidden rounded-[12px] border border-[#E6E6E6]">
                  <div className="grid grid-cols-1 divide-y divide-[#E6E6E6]">
                    {[
                      ["Weight", product.additionalInfo?.weight],
                      ["Color", product.additionalInfo?.color],
                      ["Type", product.additionalInfo?.type],
                      ["Category", product.additionalInfo?.category],
                      ["Stock Status", product.additionalInfo?.stock],
                      ["Brand", product.additionalInfo?.brand],
                      ["SKU", product.additionalInfo?.sku],
                      ["Organic", product.additionalInfo?.organic],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="grid gap-2 bg-white px-5 py-4 sm:grid-cols-[220px_1fr] sm:px-6"
                      >
                        <p className="text-sm font-semibold text-[#1A1A1A]">
                          {label}
                        </p>
                        <p className="text-sm leading-7 text-[#666666]">
                          {value || "-"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ================= CUSTOMER FEEDBACK TAB ================= */}
            {activeTab === "feedback" && (
              <div className="grid gap-8 xl:grid-cols-[320px_1fr]">
                {/* Rating Summary */}
                <div className="rounded-[12px] border border-[#E6E6E6] bg-[#FCFCFC] p-6">
                  <h3 className="text-lg font-semibold text-[#1A1A1A]">
                    Customer Reviews
                  </h3>

                  <div className="mt-5 flex items-center gap-4">
                    <div className="text-[40px] font-semibold leading-none text-[#1A1A1A]">
                      {product.rating}.0
                    </div>

                    <div>
                      <div className="flex items-center gap-[2px]">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            size={16}
                            className={
                              index < product.rating
                                ? "fill-[#FF8A00] text-[#FF8A00]"
                                : "fill-[#E6E6E6] text-[#E6E6E6]"
                            }
                          />
                        ))}
                      </div>
                      <p className="mt-1 text-sm text-[#808080]">
                        Based on {product.reviewsCount} review
                        {product.reviewsCount > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  {/* Fake breakdown bars */}
                  <div className="mt-6 space-y-4">
                    {[
                      { label: "5 Star", width: "85%" },
                      { label: "4 Star", width: "60%" },
                      { label: "3 Star", width: "35%" },
                      { label: "2 Star", width: "18%" },
                      { label: "1 Star", width: "10%" },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-[#666666]">{item.label}</span>
                          <span className="text-[#1A1A1A]">{item.width}</span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-[#E6E6E6]">
                          <div
                            className="h-full rounded-full bg-[#00B207]"
                            style={{ width: item.width }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review List */}
                <div className="space-y-5">
                  {product.reviews?.length ? (
                    product.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="rounded-[12px] border border-[#E6E6E6] bg-white p-5 sm:p-6"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h4 className="text-base font-semibold text-[#1A1A1A]">
                              {review.name}
                            </h4>
                            <p className="mt-1 text-sm text-[#808080]">
                              {review.date}
                            </p>
                          </div>

                          <div className="flex items-center gap-[2px]">
                            {[...Array(5)].map((_, index) => (
                              <Star
                                key={index}
                                size={15}
                                className={
                                  index < review.rating
                                    ? "fill-[#FF8A00] text-[#FF8A00]"
                                    : "fill-[#E6E6E6] text-[#E6E6E6]"
                                }
                              />
                            ))}
                          </div>
                        </div>

                        <p className="mt-4 text-[15px] leading-7 text-[#666666]">
                          {review.comment}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-[12px] border border-dashed border-[#D9D9D9] bg-[#FAFAFA] px-6 py-10 text-center">
                      <h4 className="text-lg font-semibold text-[#1A1A1A]">
                        No feedback yet
                      </h4>
                      <p className="mt-2 text-sm text-[#808080]">
                        This product does not have any customer reviews yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductTabsSection;
