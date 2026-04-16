
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
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">List an Item</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="name" placeholder="Item Name" onChange={handleChange} className="input" />
        <input name="brand" placeholder="Brand" onChange={handleChange} className="input" />
        <input name="size" placeholder="Size" onChange={handleChange} className="input" />
        <input name="price" placeholder="Price" onChange={handleChange} className="input" />
        <input name="location" placeholder="Location" onChange={handleChange} className="input" />

        <select name="category" onChange={handleChange} className="input">
          <option value="">Select Category</option>
          <option value="jackets">Jackets</option>
          <option value="sweaters">Sweaters</option>
          <option value="dresses">Dresses</option>
          <option value="shoes">Shoes</option>
          <option value="tops">Tops</option>
          <option value="skirts">Skirts</option>
          <option value="jeans">Jeans</option>
        </select>

        <input name="image" placeholder="Image URL" onChange={handleChange} className="input" />

        <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
          Add Listing
        </button>

      </form>
    </div>
  );
}

export default AddListing;