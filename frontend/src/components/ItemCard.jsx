// src/components/ItemCard.jsx

import { MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";

function ItemCard({ product }) {

  console.log("CARD PRODUCT:", product); // DEBUG

  return (
    <Link to={`/product/${product._id}`} className="group block animate-fade-in">
      
      <div className="relative rounded-lg shadow hover:shadow-lg transition overflow-hidden bg-white">

        {/* ✅ FIXED IMAGE */}
        <img
          src={product.images?.[0] || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-80 object-cover hover:scale-105 transition"
        />

        {/* CONDITION TAG */}
        <div className="absolute top-2 left-2">
          <span className="px-3 py-1 text-sm bg-[hsl(152_35%_45%)] text-black rounded-full">
            {product.condition || "New"}
          </span>
        </div>

        {/* HEART ICON */}
        <div className="absolute top-2 right-2">
          <button className="bg-white p-2 rounded-full border border-gray-200 hover:bg-gray-100">
            <Heart size={14} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-4">

          {/* TITLE */}
          <h3 className="font-semibold text-lg">
            {product.name}
          </h3>

          {/* BRAND + SIZE */}
          <p className="text-sm text-[hsl(220deg_33.63%_46.33%)]">
            {product.brand} • Size: {product.size}
          </p>

          {/* PRICE */}
          <div className="flex justify-between items-center mt-2">
            <span className="text-green-600 font-semibold">
              ${product.price}
            </span>
          </div>

          {/* LOCATION */}
          <div className="flex items-center text-sm text-[hsl(220deg_33.63%_46.33%)] mt-2">
            <MapPin size={14} className="mr-1" />
            {product.location}
          </div>

        </div>
      </div>
    </Link>
  );
}

export default ItemCard;