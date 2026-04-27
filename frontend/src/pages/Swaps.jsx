import { ArrowRightLeft } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Swaps() {
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ UPDATE STATUS (ACCEPT / REJECT)
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:8000/api/swaps/${id}`, { status });

      // update UI instantly
      setSwaps((prev) =>
        prev.map((s) => (s._id === id ? { ...s, status } : s))
      );

    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  // ✅ FETCH SWAPS
  useEffect(() => {
    const fetchSwaps = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        // safety check
        if (!user?._id) {
          console.log("No user found");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `http://localhost:8000/api/swaps/${user._id}`
        );

        setSwaps(res.data);

      } catch (err) {
        console.error("Error fetching swaps:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSwaps();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="pt-24 px-4 sm:px-6 md:px-10 bg-gray-50 min-h-screen">
        
        {/* TITLE */}
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Swap Requests
        </h1>

        {/* ✅ LOADING STATE */}
        {loading ? (
          <p className="text-center text-gray-500 mt-10">
            Loading swaps...
          </p>
        ) : swaps.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No swaps yet
          </p>
        ) : (
          <div className="space-y-6">
            {swaps.map((swap) => (
              <div
                key={swap._id}
                className="bg-white border rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition flex flex-col md:flex-row items-center justify-between gap-6"
              >

                {/* LEFT ITEM (REQUESTER) */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                  
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src={
                        swap.offeredProduct?.images?.[0] ||
                        "https://via.placeholder.com/150"
                      }
                      alt=""
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/150?text=Item";
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {swap.offeredProduct?.title || "Item"}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      ${swap.offeredProduct?.price || 0}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      From: {swap.requester?.name || "User"}
                    </p>
                  </div>
                </div>

                {/* SWAP ICON */}
                <div className="text-gray-400">
                  <ArrowRightLeft size={24} />
                </div>

                {/* RIGHT ITEM (OWNER) */}
                <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                  
                  <div className="text-right">
                    <h3 className="font-semibold">
                      {swap.requestedProduct?.title || "Item"}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      ${swap.requestedProduct?.price || 0}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Owner: {swap.owner?.name || "User"}
                    </p>
                  </div>

                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src={
                        swap.requestedProduct?.images?.[0] ||
                        "https://via.placeholder.com/150"
                      }
                      alt=""
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/150?text=Item";
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* STATUS + ACTIONS */}
                <div className="w-full md:w-auto flex flex-col items-center gap-2">
                  
                  {/* STATUS */}
                  <span
                    className={`px-3 py-1 text-sm rounded-full text-white font-medium ${
                      swap.status === "accepted"
                        ? "bg-green-500"
                        : swap.status === "rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {swap.status}
                  </span>

                  {/* ACTION BUTTONS */}
                  {swap.status === "pending" && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateStatus(swap._id, "accepted")
                        }
                        className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(swap._id, "rejected")
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Swaps;