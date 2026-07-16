import axios from "axios";

const DeleteProductModal = ({ open, setOpen, product, fetchProducts }) => {
  if (!open) return null;

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.delete(
        `http://localhost:5000/api/products/${product.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(data.message);

      setOpen(false);

      fetchProducts();
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6">
        <h2 className="text-2xl font-bold text-[#1A1A1A]">Delete Product</h2>

        <p className="mt-4 text-gray-600">
          Are you sure you want to delete
          <span className="font-semibold"> {product?.name}</span>?
        </p>

        <p className="mt-2 text-sm text-red-500">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg border px-5 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
