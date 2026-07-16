import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteProductModal from "./DeleteProductModal";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const navigate = useNavigate();
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:5000/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getStockBadge = (stock) => {
    if (stock === 0) return "bg-red-100 text-red-600";

    if (stock <= 10) return "bg-yellow-100 text-yellow-700";

    return "bg-green-100 text-green-700";
  };

  const getStockText = (stock) => {
    if (stock === 0) return "Out of Stock";

    if (stock <= 10) return "Low Stock";

    return "In Stock";
  };
  if (loading) {
    return <div className="flex justify-center py-20">Loading...</div>;
  }
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#F8F9FA]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Product
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Price
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Stock
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Product */}

                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-14 w-14 rounded-xl object-cover"
                    />

                    <div>
                      <h3 className="font-semibold text-[#1A1A1A]">
                        {product.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Product ID : #{product.id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Category */}

                <td className="px-6 py-5">{product.category}</td>

                {/* Price */}

                <td className="px-6 py-5 font-semibold">₹ {product.price}</td>

                {/* Stock */}

                <td className="px-6 py-5">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{product.stock}</span>

                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${getStockBadge(
                        product.stock,
                      )}`}
                    >
                      {getStockText(product.stock)}
                    </span>
                  </div>
                </td>

                {/* Action */}

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() =>
                        navigate(`/admin/products/edit/${product.id}`)
                      }
                      className="rounded-lg bg-green-100 p-2 text-green-600 hover:bg-green-200"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setDeleteOpen(true);
                      }}
                      className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteProductModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        product={selectedProduct}
        fetchProducts={fetchProducts}
      />
    </div>
  );
};

export default ProductTable;
