import Navbar from "../components/Navbar";
import { ArrowLeftRight, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

function Swaps() {

    const [swaps, setSwaps] = useState([]);

    useEffect(() => {
  axios
    .get("http://localhost:8000/api/swaps")
    .then((res) => setSwaps(res.data))
    .catch((err) => console.log(err));
}, []);

const updateStatus = (id, status) => {
  axios
    .put(`http://localhost:8000/api/swaps/${id}`, { status })
    .then((res) => {
      setSwaps((prev) =>
        prev.map((s) => (s._id === id ? res.data : s))
      );
    });
};
  

  return (
    <div>
      <Navbar />

      <div className="pt-24 px-4 md:px-10">

        <h1 className="text-3xl font-bold mb-6">Swap Requests</h1>

        {/* SWAP CARDS */}
        <div className="space-y-6">

          {swaps.map((swap) => (
            <div
              key={swap._id}
              className="border rounded-xl p-5 bg-white shadow-sm"
            >

              {/* STATUS + DATE */}
              <div className="flex justify-between items-center mb-4">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      swap.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : swap.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}
                >
                  {swap.status}
                </span>

                <span className="text-sm text-gray-500">
                  {swap.date}
                </span>

              </div>

              {/* ITEMS */}
              <div className="flex items-center justify-between">

                {/* OFFERED */}
                <div className="flex items-center gap-3">
                  <img
                    src={swap.offered.image}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium">{swap.offered.name}</p>
                    <p className="text-sm text-gray-500">
                      ${swap.offered.price}
                    </p>
                  </div>
                </div>

                {/* ARROW */}
                <ArrowLeftRight className="text-gray-400" />

                {/* REQUESTED */}
                <div className="flex items-center gap-3">
                  <img
                    src={swap.requested.image}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium">{swap.requested.name}</p>
                    <p className="text-sm text-gray-500">
                      ${swap.requested.price}
                    </p>
                  </div>
                </div>

              </div>

              {/* ACTION BUTTONS */}
              {swap.status === "pending" && (
                <div className="mt-4 flex gap-3">

                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <Check size={16} /> Accept
                  </button>

                  <button className="border px-4 py-2 rounded-lg flex items-center gap-2">
                    <X size={16} /> Decline
                  </button>

                </div>
              )}

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default Swaps;