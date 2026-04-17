
import { useState } from "react";

function AddListing() {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    size: "",
    price: "",
    location: "",
    category: "",
    image: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      ...formData,
      condition: "Good"
    };

    // GET existing products
    const existing = JSON.parse(localStorage.getItem("products")) || [];

    // ADD new product
    localStorage.setItem("products", JSON.stringify([newProduct, ...existing]));

    alert("Item Listed Successfully 🚀");
  };

  return (
  <div className="pt-24 px-4 md:px-10 lg:px-20 bg-gray-50 min-h-screen">

    <div className="max-w-5xl mx-auto bg-white border border-gray-100 p-6 md:p-10 rounded-xl shadow-sm">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2">List an Item</h1>
      <p className="text-gray-500 mb-6">
        Share your clothing and find a great swap
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* PHOTOS */}
        <div>
          <h2 className="font-semibold mb-3">Photos</h2>

          <div className="flex gap-4 flex-wrap">

            {/* Upload Box */}
            <div className="w-28 h-28 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-green-500">
              <span className="text-xl">+</span>
              <span className="text-xs">Add Photo</span>
            </div>

            {/* Empty placeholders */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-28 h-28 bg-gray-100 rounded-lg flex items-center justify-center text-gray-300"
              >
                📷
              </div>
            ))}
          </div>
        </div>

        {/* TITLE */}
        <div>
          <label className="block mb-1 font-medium">Title *</label>
          <input
            name="name"
            placeholder="e.g. Vintage Levi's Denim Jacket"
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* GRID 2 COL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* BRAND */}
          <div>
            <label className="block mb-1 font-medium">Brand *</label>
            <input
              name="brand"
              placeholder="e.g. Nike, Zara"
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block mb-1 font-medium">Category *</label>
            <select
              name="category"
              onChange={handleChange}
              className="w-full border border-gray-400 text-gray-500 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
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
          </div>

          {/* SIZE */}
          <div>
            <label className="block mb-1 font-medium">Size *</label>
            <select
              name="size"
              onChange={handleChange}
              className="w-full border border-gray-400 text-gray-500 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="">Select</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
          </div>

          {/* CONDITION */}
          <div>
            <label className="block mb-1 font-medium">Condition *</label>
            <select
              name="condition"
              onChange={handleChange}
              className="w-full border border-gray-400 text-gray-500 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="">Select</option>
              <option>New</option>
              <option>Excellent</option>
              <option>Good</option>
            </select>
          </div>

          {/* PRICE */}
          <div>
            <label className="block mb-1 font-medium">Price *</label>
            <input
              name="price"
              placeholder="$"
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* LOCATION */}
          <div>
            <label className="block mb-1 font-medium">Location *</label>
            <input
              name="location"
              placeholder="City"
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            rows="4"
            placeholder="Describe your item — material, fit, any flaws..."
            className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* IMAGE URL */}
        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            name="image"
            placeholder="Paste image link"
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* SUBMIT */}
        <button className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition">
          Add Listing
        </button>

      </form>
    </div>
  </div>
);
}

export default AddListing;