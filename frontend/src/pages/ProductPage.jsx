// src/pages/ProductPage.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

function ProductPage() {
  const { id } = useParams(); // ✅ get ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSwapRequest = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      alert("Please login first");
      return;
    }

    await axios.post(
      "http://localhost:8000/api/swaps",
      {
        requester: user._id,
        owner: product.user, // ✅ FIXED
        requestedProduct: product._id,
        offeredProduct: product._id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ IMPORTANT
        },
      }
    );

    alert("Swap request sent 🚀");

  } catch (err) {
    console.error("SWAP ERROR:", err.response?.data || err);
    alert(err.response?.data?.error || "Error sending swap");
  }
};

  useEffect(() => {
    console.log("Fetching product ID:", id);

    fetch(`http://localhost:8000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("PRODUCT DATA:", data);
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.log("ERROR:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!product || product.error) {
    return (
      <div className="p-20 text-center text-red-500 text-xl">
        Product not found
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      {/* ✅ FIX: ADD TOP PADDING (navbar overlap fix) */}
      <div className="pt-24 px-6 max-w-6xl mx-auto">

        <div className="grid md:grid-cols-2 gap-10">

          {/* IMAGE */}
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-lg"
          />

          {/* DETAILS */}
          <div>

            <h1 className="text-3xl font-bold mb-2">
              {product.name}
            </h1>

            <p className="text-gray-600 mb-2">
              {product.brand} • Size: {product.size}
            </p>

            <p className="text-green-600 text-2xl font-semibold mb-4">
              ${product.price}
            </p>

            <p className="mb-4">
              {product.description || "No description"}
            </p>

            <p className="mb-2">
              📍 {product.location}
            </p>

            <p className="mb-4">
              Condition: {product.condition}
            </p>

            <button
  onClick={handleSwapRequest}
  className="bg-green-600 text-white px-6 py-3 rounded-lg"
>
  Request Swap
</button>

          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}

export default ProductPage;