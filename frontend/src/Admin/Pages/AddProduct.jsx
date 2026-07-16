import { useState } from "react";
import { UploadCloud } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    old_price: "",
    rating: "",
    reviews_count: "",
    badge: "",
    badge_type: "",
    out_of_stock: false,
    category: "",
    sku: "",
    stock_status: "In Stock",
    brand: "",
    discount: "",
    short_description: "",
    description: "",
    features: "",
    weight: "",
    color: "",
    type: "",
    organic: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (!formData.name || !formData.price) {
        return alert("Name and Price are required");
      }

      if (!image) {
        return alert("Please upload product image");
      }

      const token = localStorage.getItem("token");

      const productData = new FormData();

      productData.append("image", image);

      Object.keys(formData).forEach((key) => {
        if (key === "features") {
          const featureArray = formData.features
            .split("\n")
            .map((item) => item.trim())
            .filter((item) => item !== "");

          productData.append("features", JSON.stringify(featureArray));
        } else {
          productData.append(key, formData[key]);
        }
      });

      const { data } = await axios.post(
        "http://localhost:5000/api/products",
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      alert(data.message);

      navigate("/admin/products");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Heading */}

      <div>
        <h1 className="text-3xl font-bold text-[#1A1A1A]">Add Product</h1>

        <p className="mt-2 text-gray-500">
          Create a new product for your EcoBazar store.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Image Upload */}

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Product Image</h2>

          <label className="flex h-72 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#00B207] bg-[#F8FFF8] transition hover:bg-[#F2FFF2]">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="h-full w-full rounded-2xl object-cover"
              />
            ) : (
              <>
                <UploadCloud size={55} className="text-[#00B207]" />

                <p className="mt-4 font-medium text-gray-700">
                  Click to upload product image
                </p>

                <span className="mt-2 text-sm text-gray-500">
                  PNG, JPG or JPEG
                </span>
              </>
            )}

            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Product Information */}

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Product Information</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Name */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Product Name *
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Product Name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#00B207]"
              />
            </div>

            {/* Category */}

            <div>
              <label className="mb-2 block text-sm font-medium">Category</label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Vegetables"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#00B207]"
              />
            </div>

            {/* Brand */}

            <div>
              <label className="mb-2 block text-sm font-medium">Brand</label>

              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Fresh Farm"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#00B207]"
              />
            </div>

            {/* SKU */}

            <div>
              <label className="mb-2 block text-sm font-medium">SKU</label>

              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="SKU-1001"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#00B207]"
              />
            </div>
          </div>
        </div>
        {/* Pricing & Stock */}

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Pricing & Stock</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Price */}

            <div>
              <label className="mb-2 block text-sm font-medium">Price *</label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#00B207]"
              />
            </div>

            {/* Old Price */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Old Price
              </label>

              <input
                type="number"
                name="old_price"
                value={formData.old_price}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#00B207]"
              />
            </div>

            {/* Discount */}

            <div>
              <label className="mb-2 block text-sm font-medium">Discount</label>

              <input
                type="text"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                placeholder="25%"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#00B207]"
              />
            </div>

            {/* Rating */}

            <div>
              <label className="mb-2 block text-sm font-medium">Rating</label>

              <input
                type="number"
                name="rating"
                min="0"
                max="5"
                value={formData.rating}
                onChange={handleChange}
                placeholder="5"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#00B207]"
              />
            </div>

            {/* Reviews */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Reviews Count
              </label>

              <input
                type="number"
                name="reviews_count"
                value={formData.reviews_count}
                onChange={handleChange}
                placeholder="120"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#00B207]"
              />
            </div>

            {/* Badge */}

            <div>
              <label className="mb-2 block text-sm font-medium">Badge</label>

              <input
                type="text"
                name="badge"
                value={formData.badge}
                onChange={handleChange}
                placeholder="Sale"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#00B207]"
              />
            </div>

            {/* Badge Type */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Badge Type
              </label>

              <select
                name="badge_type"
                value={formData.badge_type}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#00B207]"
              >
                <option value="">Select Badge</option>
                <option value="sale">Sale</option>
                <option value="new">New</option>
                <option value="hot">Hot</option>
              </select>
            </div>

            {/* Stock Status */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Stock Status
              </label>

              <select
                name="stock_status"
                value={formData.stock_status}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#00B207]"
              >
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out Of Stock</option>
              </select>
            </div>

            {/* Out Of Stock */}

            <div className="flex items-end">
              <label className="flex items-center gap-3 text-sm font-medium">
                <input
                  type="checkbox"
                  name="out_of_stock"
                  checked={formData.out_of_stock}
                  onChange={handleChange}
                  className="h-5 w-5 accent-[#00B207]"
                />
                Mark as Out Of Stock
              </label>
            </div>
          </div>
        </div>
        {/* Additional Details */}

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Additional Details</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Weight */}

            <div>
              <label className="mb-2 block text-sm font-medium">Weight</label>

              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="1 Kg"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#00B207]"
              />
            </div>

            {/* Color */}

            <div>
              <label className="mb-2 block text-sm font-medium">Color</label>

              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="Green"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#00B207]"
              />
            </div>

            {/* Type */}

            <div>
              <label className="mb-2 block text-sm font-medium">Type</label>

              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="Vegetable"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#00B207]"
              />
            </div>

            {/* Organic */}

            <div>
              <label className="mb-2 block text-sm font-medium">Organic</label>

              <select
                name="organic"
                value={formData.organic}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#00B207]"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>

        {/* Description */}

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Description</h2>

          <div className="space-y-6">
            {/* Short Description */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Short Description
              </label>

              <textarea
                rows={3}
                name="short_description"
                value={formData.short_description}
                onChange={handleChange}
                placeholder="Write short description..."
                className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#00B207]"
              />
            </div>

            {/* Description */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Description
              </label>

              <textarea
                rows={6}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write full product description..."
                className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#00B207]"
              />
            </div>

            {/* Features */}

            <div>
              <label className="mb-2 block text-sm font-medium">Features</label>

              <textarea
                rows={6}
                name="features"
                value={formData.features}
                onChange={handleChange}
                placeholder={`Example:

Fresh Product
100% Organic
Rich in Vitamin C
Farm Fresh`}
                className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#00B207]"
              />

              <p className="mt-2 text-xs text-gray-500">
                Enter one feature per line.
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}

        <div className="flex flex-col-reverse justify-end gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="rounded-xl border border-gray-300 px-8 py-3 font-medium transition hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`rounded-xl px-8 py-3 font-medium text-white transition ${
              loading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-[#00B207] hover:bg-green-700"
            }`}
          >
            {loading ? "Saving..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
