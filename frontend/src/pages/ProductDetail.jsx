import { useParams } from "react-router-dom";
import { products } from "../data/product.js";
import ProductDetailsHero from "../Components/ProductDetail.jsx/ProductDetailHero";
import ProductInfoSection from "../Components/ProductDetail.jsx/ProductInfo";
import ProductTabsSection from "../Components/ProductDetail.jsx/ProductTabSection";
import RelatedProduct from "../Components/ProductDetail.jsx/RelatedProduct";

const ProductDetails = () => {
  const { id } = useParams();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <section className="px-4 py-16">
        <div className="mx-auto max-w-[1320px]">
          <div className="rounded-[12px] border border-dashed border-[#D9D9D9] bg-[#FAFAFA] px-6 py-16 text-center">
            <h2 className="text-2xl font-semibold text-[#1A1A1A]">
              Product not found
            </h2>
            <p className="mt-3 text-[#808080]">
              The product you are looking for does not exist or may have been
              removed.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <ProductDetailsHero product={product} />
      <ProductInfoSection product={product} />
      <ProductTabsSection product={product} />
      <RelatedProduct product={product} />
    </>
  );
};

export default ProductDetails;
