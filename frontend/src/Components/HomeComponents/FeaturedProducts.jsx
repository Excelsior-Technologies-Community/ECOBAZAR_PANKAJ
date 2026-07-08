import ShopProductCard from "../ShopComponents/ShopProductCard";
import { products } from "../../data/product";

const FeaturedProducts = () => {
  const featuredProducts = products.slice(9, 13);

  return (
    <section className="px-4 pb-14 lg:pb-20">
      <div className="mx-auto max-w-[1320px]">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-[28px] font-semibold text-[#1A1A1A] sm:text-[34px]">
            Featured Products
          </h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredProducts.map((item) => (
            <ShopProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
