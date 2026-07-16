import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ProductTable from "../Components/ProductTable";
import DeleteProductModal from "../Components/DeleteProductModal";

const Products = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Products</h1>

          <p className="mt-1 text-gray-500">Manage all store products</p>
        </div>

        <button
          onClick={() => navigate("/admin/products/add")}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#00B207] px-5 py-3 text-white transition hover:bg-green-700"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      <ProductTable />
    </div>
  );
};

export default Products;
