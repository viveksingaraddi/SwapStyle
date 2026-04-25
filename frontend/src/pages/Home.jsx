// src/pages/Home.jsx

import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import Button from "../components/Button";
import heroImage from "../assets/hero-clothing.jpeg";
import { Leaf, ShieldCheck, ArrowLeftRight } from "lucide-react";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";




function Home() {

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

  

  useEffect(() => {
  fetch("http://localhost:8000/api/products")
    .then((res) => res.json())
    .then((data) => {
      console.log("PRODUCTS:", data); // 👈 ADD THIS
      setAllProducts(data);
    });
}, []);

    const recommendedProducts = allProducts.filter(
        (item) => item?.recommended
    );

    const filteredProducts =
        selectedCategory === "all"
            ? allProducts
            : allProducts.filter(
                (item) =>
                item.category?.toLowerCase() === selectedCategory
            );
    
    useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

  return (
    <div>
      <Navbar />

        <div
  className="relative bg-cover bg-center flex items-center min-h-[60vh] md:min-h-[80vh]"
  style={{ backgroundImage: `url(${heroImage})` }}
>

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Content */}
  <div className="relative container mx-auto px-4 md:px-10 py-10 md:py-20">

    <div className="max-w-xl space-y-4">

      <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
        Swap Your Style,
        <br />
        Save the Planet
      </h1>

      <p className="text-gray-200 text-sm sm:text-base md:text-lg">
        Exchange clothing with people near you. No money needed —
        just trade what you have for what you love.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 mt-4">

        <button className="px-5 py-2 md:px-6 md:py-3 bg-green-600 text-white rounded-full hover:bg-green-500 transition">
          Start Swapping
        </button>

        <button className="px-5 py-2 md:px-6 md:py-3 bg-white/50 text-white rounded-full hover:bg-green-500 transition">
          Browse Items
        </button>

      </div>

    </div>

  </div>
</div>
      
      <section className="border-b border-gray-200 bg-card">
            <div  className="relative bg-cover bg-white mx-auto px-4 py-6 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            
                <div  className="flex items-center gap-2">
                    <Leaf size={20} className="text-green-600" />
                    <span >Sustainable Fashion</span>
                </div>
                <div  className="flex items-center gap-2">
                    <ShieldCheck size={20} className="text-green-600" />
                    <span >Verified Users</span>
                </div>
                <div  className="flex items-center gap-2">
                    <ArrowLeftRight size={20} className="text-green-600" />
                    <span >10,000+ Successful Swaps</span>
                </div>
            </div>
      </section>

      <section id="browse" className="mx-auto py-8 px-0">
        <div className="container mx-10">
            <h2 className="text-2xl font-bold text-left">Browse Listings</h2>
        </div>
        <div className="container px-6 py-6">
            <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
  {["all", "jackets", "sweaters", "dresses", "shoes", "tops", "skirts", "jeans"].map((cat) => (
    <button
      key={cat}
      onClick={() => setSelectedCategory(cat)}
      className={`px-4 py-2 rounded-full border border-gray-300/50 transition
        ${
          selectedCategory === cat
            ? "bg-green-500 text-white shadow-md border-green-500"
            : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-green-50 hover:border-green-300"
        }`}
    >
      {cat.charAt(0).toUpperCase() + cat.slice(1)}
    </button>
  ))}
</div>
        </div>
      </section>
        
        
        {loading ? (
  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-2xl shadow-sm overflow-hidden"
      >
        {/* IMAGE */}
        <div className="w-full h-64 bg-gray-200"></div>

        {/* CONTENT */}
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    ))}
  </div>
) : (
  // ✅ REAL PRODUCTS
  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {filteredProducts.map((item) => (
      <ItemCard key={item._id} product={item} />
    ))}
  </div>
)}
        <section className="pb-12 bg-[hsl(40deg_25%_94%/50%)]">
            <section id="browse" className="mx-auto py-8 px-0">
                <div className="container mx-10">
                    <h2 className="text-2xl font-bold text-left">Recommended for You</h2>
                </div>
        
            </section>

            {loading ? (
  // 🔄 SKELETON FOR RECOMMENDED
  <div className="grid grid-cols-1 mx-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse"
      >
        {/* IMAGE */}
        <div className="w-full h-64 bg-gray-200"></div>

        {/* CONTENT */}
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    ))}
  </div>
) : (
  // ✅ REAL PRODUCTS
  <div className="grid grid-cols-1 mx-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {recommendedProducts.map((item) => (
      <ItemCard key={item._id} product={item} />
    ))}
  </div>
)}
        </section>

        <Footer />

</div>
  )
}

export default Home