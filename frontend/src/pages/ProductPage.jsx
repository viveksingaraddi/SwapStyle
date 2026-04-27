import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [myProducts, setMyProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // ✅ Fetch product
  useEffect(() => {
    fetch(`http://localhost:8000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // ✅ Fetch my products
  useEffect(() => {
    const fetchMyProducts = async () => {
      if (!token) return;

      const res = await axios.get(
        "http://localhost:8000/api/products/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMyProducts(res.data);
    };

    fetchMyProducts();
  }, [token]);

  // ✅ SEND SWAP
  const sendSwap = async () => {
    if (!selectedProduct) {
      alert("Please select item to offer");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/api/swaps",
        {
          owner: product.user,
          requestedProduct: product._id,
          offeredProduct: selectedProduct,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Swap request sent 🚀");
      setShowModal(false);
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Error sending swap");
    }
  };

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

  const isOwnProduct = user?._id === product.user;

  return (
    <div>
      <Navbar />

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

            <p className="mb-2">📍 {product.location}</p>

            <p className="mb-4">
              Condition: {product.condition}
            </p>

            {/* ✅ prevent self swap */}
            {!isOwnProduct && (
              <button
                onClick={() => setShowModal(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg"
              >
                Request Swap
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ✅ MODAL */}
      {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-xl w-[500px] max-h-[80vh] overflow-y-auto">
      
      <h2 className="text-xl font-bold mb-4">
        Select item to offer
      </h2>

      {/* ✅ NO PRODUCTS CASE */}
      {myProducts.length === 0 ? (
        <div className="text-center">
          <p className="mb-4 text-gray-600">
            You don’t have any items to swap
          </p>

          <button
            onClick={() => setShowModal(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      ) : (
        <>
          {/* ✅ GRID LISTING UI */}
          <div className="grid grid-cols-2 gap-4">
            {myProducts.map((item) => (
              <div
                key={item._id}
                onClick={() => setSelectedProduct(item._id)}
                className={`border rounded-lg p-2 cursor-pointer transition ${
                  selectedProduct === item._id
                    ? "border-green-500 bg-green-50"
                    : "hover:shadow-md"
                }`}
              >
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded"
                />

                <p className="mt-2 text-sm font-medium">
                  {item.name}
                </p>
              </div>
            ))}
          </div>

          {/* ✅ ACTION BUTTON */}
          <button
            onClick={sendSwap}
            disabled={!selectedProduct}
            className={`mt-6 w-full py-2 rounded text-white ${
              selectedProduct
                ? "bg-green-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Confirm Swap
          </button>
        </>
      )}
    </div>
  </div>
)}

      <Footer />
    </div>
  );
}

export default ProductPage;