// src/pages/ProductPage.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ProductPage() {
  const { id } = useParams(); // ✅ get ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-500">
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