// src/components/Navbar.jsx

import { Search, Bell, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const notifications = 3;

  return (
    <nav className="absolute fixed top-0 w-full bg-white/60 backdrop-blur-md shadow-sm z-50">

      {/* MAIN NAVBAR */}
      <div className="flex items-center justify-between px-4  py-3">

        {/* LOGO */}
        <h1 className="text-lg md:text-xl font-bold text-green-600">
          SwapStyle
        </h1>

        {/* SEARCH (HIDDEN ON MOBILE) */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <div className="relative w-full max-w-md">

            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />

            <input
              type="text"
              placeholder="Search clothing, brands..."
              className="w-full h-10 pl-10 pr-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-6">

          {[
  { name: "Browse", path: "/" },
  { name: "List Item", path: "/list-item" },
  { name: "Swaps", path: "/swaps" },
  { name: "Messages", path: "/messages" },
  { name: "Profile", path: "/profile" },
  { name: "Admin", path: "/admin" },
].map((item) => (
  <Link
    key={item.name}
    to={item.path}
    className="relative group text-sm font-medium"
  >
    {item.name}
    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
  </Link>
))}

          <Bell size={20} className="cursor-pointer" />
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="flex items-center gap-3 lg:hidden">

         <div className="relative cursor-pointer">
    <Bell size={20} />

    {notifications > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full">
        {notifications}
        </span>
    )}
    </div>

          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>

      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isOpen && (
        <div className="lg:hidden px-4 pb-4 space-y-4 bg-white shadow-md">

          {/* SEARCH (MOBILE) */}
          <div className="relative">

            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />

            <input
              type="text"
              placeholder="Search..."
              className="w-full h-10 pl-10 pr-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* MENU ITEMS */}
          {[
            { name: "Browse", path: "/" },
            { name: "List Item", path: "/list-item" },
            { name: "Swaps", path: "/swaps" },
            { name: "Messages", path: "/messages" },
            { name: "Profile", path: "/profile" },
            { name: "Admin", path: "/admin" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="block text-sm font-medium border-b pb-2 hover:text-green-600 transition"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}

    </nav>
  );
}

export default Navbar;