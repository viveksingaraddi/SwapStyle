import { useState } from "react";
import Navbar from "../components/Navbar";
import placeholder from "../assets/placeholder.jpg";

function AddListing() {

  // ✅ USER FIRST (SAFE PARSE)
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // ✅ STATE (MUST BE AT TOP)
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    size: "",
    price: "",
    location: "",
    category: "",
    condition: "",
    description: "",
    images: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    brand: "",
    category: "",
    size: "",
    condition: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500";

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    if (files.length + formData.images.length > 4) {
      alert("Max 4 images allowed");
      return;
    }

    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (typeof reader.result === "string") {
            resolve(reader.result);
          }
        };

        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((images) => {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...images],
      }));
    });
  };

  // ✅ VALIDATION
  const validate = () => {
    const newErrors = {
      name: "",
      brand: "",
      category: "",
      size: "",
      condition: "",
      price: "",
    };

    if (!formData.name) newErrors.name = "Required";
    if (!formData.brand) newErrors.brand = "Required";
    if (!formData.category) newErrors.category = "Required";
    if (!formData.size) newErrors.size = "Required";
    if (!formData.condition) newErrors.condition = "Required";
    if (!formData.price) newErrors.price = "Required";

    setErrors(newErrors);

    return Object.values(newErrors).every((val) => val === "");
  };

  // ✅ SUBMIT (FIXED)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          user: user?._id, // ✅ FIXED SAFE ACCESS
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("SERVER ERROR:", text);
        throw new Error("Failed");
      }

      await res.json();

      alert("🚀 Item Listed Successfully!");

      // RESET
      setFormData({
        name: "",
        brand: "",
        size: "",
        price: "",
        location: "",
        category: "",
        condition: "",
        description: "",
        images: [],
      });

    } catch (err) {
      console.error(err);
      alert("Error listing product");
    } finally {
      setLoading(false);
    }
  };


  return (
  <div>
    <Navbar />

    <div className="pt-24 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* ================= LEFT FORM ================= */}
        <form
          onSubmit={handleSubmit}
          className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm"
        >
          <h2 className="text-3xl font-semibold mb-2">List an Item</h2>
          <p className="text-gray-500 mb-6">
            Share your clothing and find a great swap
          </p>

          {/* PHOTO UPLOAD */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">
              Photos
            </label>

            <div className="flex gap-4">
              {/* Upload Box */}
              <label className="w-28 h-28 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-green-500 transition">
                <span className="text-xl">⬆️</span>
                <span className="text-xs text-gray-500">Add Photo</span>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              {/* Image Slots */}
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-28 h-28 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden"
                >
                  {formData.images[i] ? (
                    <img
                      src={formData.images[i]}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-2xl">🖼️</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* TITLE */}
          <div className="mb-4">
            <label className="text-sm font-medium">
              Title *
            </label>
            <input
              name="name"
              placeholder="e.g. Vintage Levi's Denim Jacket"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* GRID */}
          <div className="grid grid-cols-2 gap-4 mb-4">

            <div>
              <label className="text-sm font-medium">Brand *</label>
              <input
                name="brand"
                placeholder="e.g. Nike, Zara"
                value={formData.brand}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select</option>
                <option>Jackets</option>
                <option>Tops</option>
                <option>Jeans</option>
                <option>Shoes</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Size *</label>
              <select
                name="size"
                value={formData.size}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Condition *</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select</option>
                <option>New</option>
                <option>Good</option>
                <option>Used</option>
              </select>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mb-4">
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              placeholder="Describe your item..."
              value={formData.description}
              onChange={handleChange}
              className={`${inputClass} h-28`}
            />
          </div>

          {/* PRICE + LOCATION */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <input
              name="price"
              placeholder="Swap Value ($)"
              value={formData.price}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              name="location"
              placeholder="City, State"
              value={formData.location}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold"
          >
            {loading ? "Publishing..." : "Publish Listing"}
          </button>
        </form>

        {/* ================= RIGHT PREVIEW ================= */}
        <div className="bg-white p-4 rounded-2xl shadow-sm h-fit sticky top-24">
          <h3 className="font-semibold mb-3">Preview</h3>

          <div className="border rounded-xl overflow-hidden">
            <img
              src={formData.images?.[0] || placeholder}
              className="w-full h-44 object-cover"
            />

            <div className="p-3">
              <h4 className="font-semibold">
                {formData.name || "Item Name"}
              </h4>

              <p className="text-sm text-gray-500">
                {formData.brand || "Brand"} • {formData.size || "Size"}
              </p>

              <p className="text-green-600 font-bold mt-2">
                ${formData.price || 0}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
);
}

export default AddListing;