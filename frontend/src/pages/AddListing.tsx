import { useState } from "react";
import placeholder from "../assets/placeholder.jpg";

function AddListing() {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    size: "",
    price: "",
    location: "",
    category: "",
    condition: "",
    description: "",
    images: []
  });

  const [errors, setErrors] = useState({});

  // INPUT STYLE (Reusable)
  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition";

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // HANDLE IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((images) => {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...images]
      }));
    });
  };

  // VALIDATION
  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Title is required";
    if (!formData.brand) newErrors.brand = "Brand is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.size) newErrors.size = "Size is required";
    if (!formData.condition) newErrors.condition = "Condition is required";
    if (!formData.price) newErrors.price = "Price is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const newProduct = {
      id: Date.now(),
      ...formData,
      image: formData.images[0] || "",
      recommended: false
    };

    const existing = JSON.parse(localStorage.getItem("products")) || [];

    localStorage.setItem(
      "products",
      JSON.stringify([newProduct, ...existing])
    );

    alert("🚀 Item Listed Successfully!");

    // RESET FORM
    setFormData({
      name: "",
      brand: "",
      size: "",
      price: "",
      location: "",
      category: "",
      condition: "",
      description: "",
      images: []
    });
  };

  return (
    <div className="pt-24 px-4 md:px-10 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {/* LEFT SIDE FORM */}
        <form
          onSubmit={handleSubmit}
          className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm"
        >
          <h2 className="text-3xl font-bold mb-2">List an Item</h2>
          <p className="text-gray-500 mb-6">
            Share your clothing and find a great swap
          </p>

          {/* IMAGE UPLOAD */}
          <div className="mb-6">
  <label className="block text-sm font-semibold mb-3">
    Photos
  </label>

  <div className="flex gap-4">

    {/* MAIN UPLOAD BOX */}
    <label className="w-28 h-28 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-green-500 transition">

      <span className="text-2xl">⬆️</span>
      <span className="text-xs text-gray-500 mt-1">Add Photo</span>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </label>

    {/* PREVIEW BOXES */}
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
          <span className="text-gray-400 text-xl">🖼️</span>
        )}
      </div>
    ))}

  </div>

  <p className="text-xs text-gray-400 mt-2">
    Upload up to 4 images (JPG, PNG)
  </p>
</div>

          {/* TITLE */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              placeholder="e.g. Vintage Levi's Denim Jacket"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* BRAND */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Brand <span className="text-red-500">*</span>
              </label>
              <input
                name="brand"
                placeholder="e.g. Nike, Zara"
                value={formData.brand}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.brand && (
                <p className="text-red-500 text-xs mt-1">{errors.brand}</p>
              )}
            </div>

            {/* CATEGORY */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select</option>
                <option value="jackets">Jackets</option>
                <option value="sweaters">Sweaters</option>
                <option value="dresses">Dresses</option>
                <option value="shoes">Shoes</option>
                <option value="tops">Tops</option>
                <option value="skirts">Skirts</option>
                <option value="jeans">Jeans</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
              )}
            </div>

            {/* SIZE */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Size <span className="text-red-500">*</span>
              </label>
              <select
                name="size"
                value={formData.size}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select</option>
                <option>XS</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
              {errors.size && (
                <p className="text-red-500 text-xs mt-1">{errors.size}</p>
              )}
            </div>

            {/* CONDITION */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Condition <span className="text-red-500">*</span>
              </label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select</option>
                <option>New</option>
                <option>Excellent</option>
                <option>Good</option>
                <option>Used</option>
              </select>
              {errors.condition && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.condition}
                </p>
              )}
            </div>

            {/* PRICE */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Swap Value ($) <span className="text-red-500">*</span>
              </label>
              <input
                name="price"
                placeholder="30"
                value={formData.price}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price}</p>
              )}
            </div>

            {/* LOCATION */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Location
              </label>
              <input
                name="location"
                placeholder="City, State"
                value={formData.location}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

          </div>

          {/* DESCRIPTION */}
          <div className="mt-6">
            <label className="block text-sm font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Describe your item — material, fit, any flaws..."
              value={formData.description}
              onChange={handleChange}
              className={`${inputClass} h-32 resize-none`}
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-semibold transition shadow-md"
          >
            🚀 Publish Listing
          </button>
        </form>

        {/* RIGHT SIDE PREVIEW */}
        <div className="bg-white p-4 rounded-2xl shadow-sm h-fit sticky top-24">
          <h3 className="font-semibold mb-3">Preview</h3>

          <div className="border rounded-xl overflow-hidden">
            <img
              src={
                formData.images[0] ||
                "https://via.placeholder.com/300x200"
              }
              className="w-full h-40 object-cover"
            />

            <div className="p-3">
              <h4 className="font-semibold">
                {formData.name || "Item Name"}
              </h4>
              <p className="text-sm text-gray-500">
                {formData.brand || "Brand"} •{" "}
                {formData.size || "Size"}
              </p>
              <p className="text-green-600 font-bold mt-2">
                ${formData.price || 0}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AddListing;