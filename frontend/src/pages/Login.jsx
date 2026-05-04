import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import loginimg from "../assets/login.png";         

function Login() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const requestLocation = async (token) => {
    if (!("geolocation" in navigator)) return;

    const permission = confirm("SwapStyle would like to use your live location to show nearby swaps. Allow?");
    if (!permission) return;

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        // Simple reverse geocode (Free API)
        const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
        const geoData = await geoRes.json();
        
        // Exact location construction
        const parts = [
            geoData.locality,
            geoData.city,
            geoData.principalSubdivision,
            geoData.countryName
        ].filter(Boolean);

        const locationStr = parts.join(", ");

        // Save to backend
        await axios.put("http://localhost:8000/api/users/profile", 
          { location: locationStr },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Update local user data
        const storedUser = JSON.parse(localStorage.getItem("user"));
        storedUser.location = locationStr;
        localStorage.setItem("user", JSON.stringify(storedUser));
        
        console.log("Location saved:", locationStr);
      } catch (err) {
        console.error("Geo error:", err);
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const url = isLogin
        ? "http://localhost:8000/api/auth/login"
        : "http://localhost:8000/api/auth/register";

      const res = await axios.post(url, form);

      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // ✅ AUTO-LOCATION
        await requestLocation(res.data.token);

        navigate("/");
      } else {
        alert("Registered successfully 🚀");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">

      <div className="w-full h-full max-w-6xl bg-[#1f1f2e] rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT IMAGE */}
        <div className="hidden md:flex relative">
          <img
            src={loginimg}
            alt="fashion"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-10">
            <h2 className="text-white text-3xl font-bold">
              Swap Your Style 🌱
            </h2>
            <p className="text-gray-300 mt-2">
              Exchange clothes. Discover new looks sustainably.
            </p>
          </div>
          
        </div>

        {/* RIGHT FORM */}
        <div className="p-8 md:p-12 text-white">

          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {isLogin ? "Welcome Back 👋" : "Create an account"}
          </h1>

          <p className="text-gray-400 mb-6">
            {isLogin ? "New here?" : "Already have an account?"}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-green-400 cursor-pointer ml-2 hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>

          {/* NAME (SIGNUP ONLY) */}
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500"
            />
          )}

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500"
          />

          {/* PASSWORD */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400"
              type="button"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 hover:bg-green-600 transition p-3 rounded-lg font-semibold"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-6 text-gray-500 text-sm">
            <div className="flex-1 h-px bg-gray-700"></div>
            OR
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* SOCIAL BUTTONS (UI ONLY) */}
          <div className="flex gap-4">
            <button className="w-full border border-gray-600 p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5 h-5"
              />
              Google
            </button>

            <button className="w-full border border-gray-600 p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apple_logo_white.svg/1280px-Apple_logo_white.svg.png"
                className="w-5 h-5"
              />
              Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;