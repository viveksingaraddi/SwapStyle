import { ArrowRightLeft } from "lucide-react";
import { useState } from "react";
import Navbar from "../components/Navbar";

function Swaps() {
  const [swaps, setSwaps] = useState([
    {
      id: 1,
      status: "pending",
      offeredItem: {
        name: "Denim Jacket",
        image: "https://via.placeholder.com/150",
        price: 45,
      },
      requestedItem: {
        name: "Sweater",
        image: "https://via.placeholder.com/150",
        price: 35,
      },
    },
    {
      id: 2,
      status: "accepted",
      offeredItem: {
        name: "Nike Shoes",
        image: "https://via.placeholder.com/150",
        price: 60,
      },
      requestedItem: {
        name: "Zara Jacket",
        image: "https://via.placeholder.com/150",
        price: 50,
      },
    },
    {
      id: 3,
      status: "rejected",
      offeredItem: {
        name: "Hoodie",
        image: "https://via.placeholder.com/150",
        price: 30,
      },
      requestedItem: {
        name: "Jeans",
        image: "https://via.placeholder.com/150",
        price: 40,
      },
    },
  ]);

  return (
    <div>
      <Navbar />
    <div className="pt-25 px-4 sm:px-6 md:px-10 bg-gray-50 min-h-screen">
      
      {/* TITLE */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Swap Requests
      </h1>

      {/* SWAP LIST */}
      <div className="space-y-6">
        {swaps.map((swap) => (
          <div
            key={swap.id}
            className="bg-white border rounded-xl p-4 sm:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4"
          >

            {/* LEFT ITEM */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <img
                src={swap.offeredItem.image}
                alt=""
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
              />
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
            <div className="text-gray-500">
              <ArrowRightLeft size={20} />
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
              <img
                src={swap.requestedItem.image}
                alt=""
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
              />
            </div>

            {/* STATUS */}
            <div className="w-full md:w-auto text-center md:text-right">
              <span
                className={`px-3 py-1 text-sm rounded-full text-white ${
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