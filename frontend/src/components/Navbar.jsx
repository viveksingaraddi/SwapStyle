// src/components/Navbar.jsx

import { Search, Bell, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const token = localStorage.getItem("token");

  // ✅ FETCH NOTIFICATIONS COUNT
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const unread = res.data.filter(n => !n.isRead).length;
        setUnreadCount(unread);
      } catch (err) {
        console.error(err);
      }
    };

    if (token) {
        fetchCount();
        const interval = setInterval(fetchCount, 30000); // Check every 30s
        return () => clearInterval(interval);
    }
  }, [token]);

  // ✅ FETCH SUGGESTIONS
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:8000/api/products?search=${searchQuery}&limit=5`);
        setSuggestions(res.data.products);
      } catch (err) {
        console.error(err);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <nav className="absolute fixed top-0 w-full bg-white/60 backdrop-blur-md shadow-sm z-50">

      {/* MAIN NAVBAR */}
      <div className="flex items-center justify-between px-4  py-3">

        {/* LOGO */}
        <h1 className="text-lg md:text-xl font-bold text-green-600 cursor-pointer" onClick={() => navigate("/")}>
          SwapStyle
        </h1>

        {/* SEARCH (HIDDEN ON MOBILE) */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <div className="relative w-full max-w-md">

            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />

            <input
              type="text"
              placeholder="Search clothing, brands..."
              value={searchQuery}
              onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="w-full h-10 pl-10 pr-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* ✅ DROPDOWN */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-11 left-0 w-full bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-[100]">
                    {suggestions.map((item) => (
                        <Link 
                            key={item._id}
                            to={`/product/${item._id}`}
                            onClick={() => setShowSuggestions(false)}
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-100 last:border-none transition"
                        >
                            <img src={item.images?.[0]} className="w-10 h-10 object-cover rounded" />
                            <div>
                                <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                                <p className="text-xs text-gray-500">{item.brand} • ${item.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
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

          <Link to="/notifications" className="relative cursor-pointer hover:text-green-600 transition">
            <Bell size={20} />
            {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full">
                {unreadCount}
                </span>
            )}
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="flex items-center gap-3 lg:hidden">

         <Link to="/notifications" className="relative cursor-pointer">
    <Bell size={20} />

    {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full">
        {unreadCount}
        </span>
    )}
    </Link>

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
              value={searchQuery}
              onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="w-full h-10 pl-10 pr-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {/* MOBILE SUGGESTIONS */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="mt-2 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
                    {suggestions.map((item) => (
                        <Link 
                            key={item._id}
                            to={`/product/${item._id}`}
                            onClick={() => {
                                setShowSuggestions(false);
                                setIsOpen(false);
                            }}
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-100 last:border-none"
                        >
                            <img src={item.images?.[0]} className="w-8 h-8 object-cover rounded" />
                            <p className="text-sm text-gray-800">{item.name}</p>
                        </Link>
                    ))}
                </div>
            )}
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