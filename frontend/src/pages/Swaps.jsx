import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Swaps() {
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || {};
  

  useEffect(() => {
    if (!token) return;

    const fetchSwaps = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "http://localhost:8000/api/swaps",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const validSwaps = res.data.filter(
          (s) => s.requestedProduct && s.offeredProduct
        );

        setSwaps(validSwaps);

        // ✅ cache update
        localStorage.setItem("swaps", JSON.stringify(validSwaps));

      } catch (err) {
        console.error("Error fetching swaps:", err);

        // ✅ fallback
        const cached = localStorage.getItem("swaps");
        if (cached) {
          setSwaps(JSON.parse(cached));
        }

      } finally {
        setLoading(false);
      }
    };

    fetchSwaps();
  }, [token]);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:8000/api/swaps/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSwaps((prev) =>
        prev.map((s) => (s._id === id ? { ...s, status } : s))
      );

      // ✅ clear cache so next fetch is fresh
      localStorage.removeItem("swaps");

    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (!token) return <p className="p-6">Please login first</p>;

  if (loading)
  return (
    <div>
      <Navbar />

      <div className="pt-24 px-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Swap Requests</h1>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="border rounded-xl p-4 flex items-center justify-between animate-pulse"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded"></div>
                <div className="w-24 h-4 bg-gray-200 rounded"></div>

                <div className="w-6 h-4 bg-gray-200 rounded"></div>

                <div className="w-16 h-16 bg-gray-200 rounded"></div>
                <div className="w-24 h-4 bg-gray-200 rounded"></div>
              </div>

              <div className="w-16 h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />

      <div className="pt-24 px-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Swap Requests</h1>

        {swaps.length === 0 ? (
          <p>No swaps found</p>
        ) : (
          swaps.map((swap) => {
            const isOwner = swap.owner?._id === user?._id;

            return (
              <div
                key={swap._id}
                className="border rounded-xl p-4 mb-4 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                    {/* LEFT - Offered */}
                    <div className="flex items-center gap-3">
                    <img
                        src={swap.offeredProduct?.images?.[0]}
                        alt=""
                        className="w-20 h-20 object-cover rounded"
                    />
                    <p className="font-medium text-sm md:text-base">
                        {swap.offeredProduct?.name}
                    </p>
                    </div>

                    {/* MIDDLE */}
                    <div className="text-xl">⇄</div>

                    {/* RIGHT - Requested */}
                    <div className="flex items-center gap-3">
                    <img
                        src={swap.requestedProduct?.images?.[0]}
                        alt=""
                        className="w-20 h-20 object-cover rounded"
                    />
                    <p className="font-medium text-sm md:text-base">
                        {swap.requestedProduct?.name}
                    </p>
                    </div>
                </div>

                {/* STATUS + ACTION */}
                <div className="text-center md:text-right w-full md:w-auto pt-4 md:pt-0 border-t md:border-none">
                  <p className="capitalize mb-2 font-bold text-sm">{swap.status}</p>

                  {/* ✅ ONLY OWNER CAN ACCEPT */}
                  {isOwner && swap.status === "pending" && (
                    <div className="flex justify-center md:justify-end gap-2">
                      <button
                        onClick={() =>
                          updateStatus(swap._id, "accepted")
                        }
                        className="bg-green-500 text-white px-4 py-2 rounded text-sm font-semibold"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          updateStatus(swap._id, "rejected")
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded text-sm font-semibold"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Swaps;