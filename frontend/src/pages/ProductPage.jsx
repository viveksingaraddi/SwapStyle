import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import products from "../data/products";
import { MapPin, Heart, Share2 } from "lucide-react";
import ItemCard from "../components/ItemCard";

function ProductPage() {
const { id } = useParams();
const [allProducts, setAllProducts] = useState([]);
const [selectedImage, setSelectedImage] = useState(null);

useEffect(() => {
  const stored = JSON.parse(localStorage.getItem("products")) || [];
  setAllProducts([...stored, ...products]);
}, []);

const product = allProducts.find(
  (item) => item.id === parseInt(id)
);

useEffect(() => {
  if (product) {
    if (product.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    } else {
      setSelectedImage(product.image);
    }
  }
}, [product]);


const similarProducts = allProducts.filter(
  (item) =>
    item.category === product?.category &&
    item.id !== product?.id
).slice(0, 4); // limit to 4 (clean UI)

  if (!product) {
    return <h1 className="p-10 text-center text-xl">Product not found</h1>;
  }

  if (allProducts.length === 0) {
  return <div className="p-10 text-center">Loading...</div>;
}



  return (
    <div className="pt-24 px-4 md:px-10 lg:px-20">

      {/* MAIN SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT → IMAGE GALLERY */}
        <div className="flex flex-col gap-4">

          {/* MAIN IMAGE */}
          <div className="bg-gray-100 rounded-xl p-4 flex justify-center sticky top-24">
            <div className="flex flex-col gap-4">

  {/* MAIN IMAGE */}
  <div className="bg-gray-100 rounded-xl p-4 flex justify-center sticky top-24">
    <img
      src={selectedImage || product.image}
      className="w-full max-h-[500px] object-contain rounded-lg transition"
    />
  </div>

  {/* THUMBNAILS */}
  <div className="flex gap-3">
    {(product.images?.length > 0
      ? product.images
      : [product.image]
    ).map((img, i) => (
      <img
        key={i}
        src={img}
        onClick={() => setSelectedImage(img)}
        className={`w-20 h-20 object-cover rounded-lg border cursor-pointer transition
          ${
            selectedImage === img
              ? "border-green-500 ring-2 ring-green-400"
              : "hover:scale-105"
          }`}
      />
    ))}
  </div>
</div>
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-3">
            {[product.image, product.image, product.image].map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>
        </div>

        {/* RIGHT → DETAILS */}
        <div className="flex flex-col gap-5">

          {/* TITLE */}
          <h1 className="text-2xl md:text-3xl font-bold">
            {product.name}
          </h1>

          {/* BRAND */}
          <p className="text-gray-500">
            {product.brand} • Size: {product.size}
          </p>

          {/* PRICE */}
          <div className="flex items-center gap-4">
            <span className="text-3xl text-green-600 font-bold">
              ${product.price}
            </span>
            <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
              Best Deal
            </span>
          </div>

          {/* LOCATION */}
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={18} />
            {product.location}
          </div>

          {/* CONDITION */}
          <span className="w-fit px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">
            {product.condition}
          </span>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3 mt-4 flex-wrap">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
              Request Swap
            </button>

            <button className="border px-4 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-100">
              <Heart size={18} /> Wishlist
            </button>

            <button className="border px-4 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-100">
              <Share2 size={18} /> Share
            </button>
          </div>

          {/* SELLER INFO */}
          <div className="mt-6 border rounded-lg p-4 bg-gray-50">
            <h3 className="font-semibold mb-2">Seller Info</h3>
            <p className="text-sm text-gray-600">
              Verified User ✔️ <br />
              Member since 2024 <br />
              25 Successful Swaps
            </p>
          </div>

        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-3">Description</h2>
        <p className="text-gray-600 leading-relaxed">
          This item is in great condition and ready for swapping. Help reduce
          waste and promote sustainable fashion by exchanging items you no
          longer use.
        </p>
      </div>

      {/* SIMILAR PRODUCTS */}
      <div className="mt-16">

  <h2 className="text-2xl font-bold mb-6">
    More like this
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {similarProducts.length > 0 ? (
      similarProducts.map((item) => (
        <ItemCard key={item.id} product={item} />
      ))
    ) : (
      <p className="text-gray-500">
        No similar items found
      </p>
    )}
  </div>

</div>

    </div>
  );
}

export default ProductPage;