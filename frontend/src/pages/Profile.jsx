import Navbar from "../components/Navbar";
import { User, MapPin, Calendar, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();

  const user = {
    name: "Sarah Mitchell",
    location: "Brooklyn, NY",
    joined: "Jan 2025",
    swaps: 1,
    bio: "Vintage lover & sustainable fashion advocate. Always looking for unique denim and statement pieces! 🌿",
  };

  return (
    <div>
      <Navbar />

      <div className="pt-24 px-4 sm:px-6 md:px-10 bg-gray-50 min-h-screen">

        {/* PROFILE HEADER */}
        <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6">

          {/* AVATAR */}
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            <User className="text-green-600" size={40} />
          </div>

          {/* USER INFO */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold">{user.name}</h1>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-500 text-sm mt-2">
              <span className="flex items-center gap-1">
                <MapPin size={14} /> {user.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} /> Joined {user.joined}
              </span>
              <span className="flex items-center gap-1">
                <RefreshCcw size={14} /> {user.swaps} Swaps
              </span>
            </div>

            <p className="text-gray-600 mt-3">{user.bio}</p>
          </div>

          {/* EDIT BUTTON */}
          <button className="border px-4 py-2 rounded-lg hover:bg-gray-100 transition">
            Edit Profile
          </button>
        </div>

        {/* TABS */}
        <div className="mt-6 flex gap-3">
          <button className="px-4 py-2 bg-white rounded-lg shadow-sm">
            My Listings (0)
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg">
            Swap History
          </button>
        </div>

        {/* EMPTY STATE */}
        <div className="text-center mt-20">
          <p className="text-gray-500 mb-4">
            You haven't listed any items yet.
          </p>
          <button onClick={() => navigate("/list-item")} className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition">
            Create Your First Listing
          </button>
        </div>

      </div>
    </div>
  );
}

export default Profile;