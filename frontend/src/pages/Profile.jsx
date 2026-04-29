import Navbar from "../components/Navbar";
import { User, MapPin, Calendar, RefreshCcw, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [myProducts, setMyProducts] = useState([]);
  const [mySwaps, setMySwaps] = useState([]);

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("listings"); // 🔥 NEW

  // ✅ GET USER
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // ✅ LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ✅ FETCH DATA
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // 🔥 PARALLEL FETCH
        const [productsRes, swapsRes] = await Promise.all([
          axios.get("http://localhost:8000/api/products/my", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8000/api/swaps", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setMyProducts(productsRes.data);
        setMySwaps(swapsRes.data);
      } catch (err) {
        console.error("Error fetching profile data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="pt-24 px-4 sm:px-6 md:px-10 bg-gray-50 min-h-screen">

        {/* PROFILE HEADER */}
        <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6">

          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            <User className="text-green-600" size={40} />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold">{user.name}</h1>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-500 text-sm mt-2">
              {user.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {user.location}
                </span>
              )}

              <span className="flex items-center gap-1">
                <Calendar size={14} /> Joined Recently
              </span>

              <span className="flex items-center gap-1">
                <RefreshCcw size={14} /> {mySwaps.length} Swaps
              </span>
            </div>

            <p className="text-gray-600 mt-3">
              {user.bio || "Welcome to SwapStyle 🚀 Start swapping now!"}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <button
  onClick={() => navigate("/edit-profile")}
  className="border px-4 py-2 rounded-lg hover:bg-gray-100 transition hover:scale-105 active:scale-95"
>
  Edit Profile
</button>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setActiveTab("listings")}
            className={`px-4 py-2 rounded-lg shadow-sm font-medium ${
              activeTab === "listings"
                ? "bg-white"
                : "bg-gray-200"
            }`}
          >
            My Listings ({myProducts.length})
          </button>

          <button
            onClick={() => setActiveTab("swaps")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "swaps"
                ? "bg-white shadow-sm font-medium"
                : "bg-gray-200"
            }`}
          >
            Swap History
          </button>
        </div>

        {/* CONTENT */}
        {loading ? (
  <div className="mt-8 space-y-6 animate-pulse">
    
    {/* Grid Skeleton */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      
      {[...Array(6)].map((_, i) => (
        <div key={i} className="border border-gray-400 rounded-xl overflow-hidden shadow-sm">
          
          {/* Image Skeleton */}
          <div className="w-full h-48 bg-gray-200"></div>

          {/* Content Skeleton */}
          <div className="p-3 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>

        </div>
      ))}

    </div>
  </div>
) : activeTab === "listings" ? (
          myProducts.length === 0 ? (
            <div className="text-center mt-10">
              <p className="text-gray-500 mb-4">
                You haven't listed any items yet.
              </p>
              <button
                onClick={() => navigate("/list-item")}
                className="bg-green-600 text-white px-6 py-2 rounded-lg"
              >
                Create Your First Listing
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {myProducts.map((item) => (
                <div
                  key={item._id}
                  className="border border-gray-400 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={item.images?.[0]}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-3">
                    <h3 className="font-semibold text-sm">{item.name}</h3>
                    <p className="text-gray-500 text-xs">{item.brand}</p>
                    <p className="text-green-600 font-bold mt-1">
                      ${item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          // 🔥 SWAP HISTORY VIEW
          mySwaps.length === 0 ? (
            <p className="text-center mt-10 text-gray-500">
              No swaps found
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {mySwaps.map((swap) => (
                <div
                  key={swap._id}
                  className="border rounded-xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={swap.offeredProduct?.images?.[0]}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <span className="font-medium">
                      {swap.offeredProduct?.name}
                    </span>

                    <span>⇄</span>

                    <img
                      src={swap.requestedProduct?.images?.[0]}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <span className="font-medium">
                      {swap.requestedProduct?.name}
                    </span>
                  </div>

                  <span className="text-sm font-semibold capitalize">
                    {swap.status}
                  </span>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Profile;