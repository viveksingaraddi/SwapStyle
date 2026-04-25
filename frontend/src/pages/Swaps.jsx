import { ArrowRightLeft } from "lucide-react";
import { useState } from "react";
import Navbar from "../components/Navbar";

function Swaps() {
  const [swaps] = useState([
    {
      id: 1,
      status: "pending",
      offeredItem: {
        name: "Denim Jacket",
        image:
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300",
        price: 45,
      },
      requestedItem: {
        name: "Sweater",
        image:
          "data:image/jpeg;base64,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",
        price: 35,
      },
    },
    {
      id: 2,
      status: "accepted",
      offeredItem: {
        name: "Nike Shoes",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
        price: 60,
      },
      requestedItem: {
        name: "Zara Jacket",
        image:
          "data:image/jpeg;base64,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",
        price: 50,
      },
    },
    {
      id: 3,
      status: "rejected",
      offeredItem: {
        name: "Hoodie",
        image:
          "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=300",
        price: 30,
      },
      requestedItem: {
        name: "Jeans",
        image:
          "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=300",
        price: 40,
      },
    },
  ]);

  return (
    <div>
      <Navbar />

      <div className="pt-24 px-4 sm:px-6 md:px-10 bg-gray-50 min-h-screen">
        
        {/* TITLE */}
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Swap Requests
        </h1>

        {/* SWAP LIST */}
        <div className="space-y-6">
          {swaps.map((swap) => (
            <div
              key={swap.id}
              className="bg-white border rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition flex flex-col md:flex-row items-center justify-between gap-4"
            >

              {/* LEFT ITEM */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src={swap.offeredItem.image}
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
                    {swap.offeredItem.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    ${swap.offeredItem.price}
                  </p>
                </div>
              </div>

              {/* SWAP ICON */}
              <div className="text-gray-400">
                <ArrowRightLeft size={22} />
              </div>

              {/* RIGHT ITEM */}
              <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                
                <div className="text-right">
                  <h3 className="font-semibold">
                    {swap.requestedItem.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    ${swap.requestedItem.price}
                  </p>
                </div>

                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src={swap.requestedItem.image}
                    alt=""
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/150?text=Item";
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* STATUS */}
              <div className="w-full md:w-auto text-center md:text-right">
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Swaps;