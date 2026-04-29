import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    bio: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Load existing user data
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFormData({
        name: user.name || "",
        location: user.location || "",
        bio: user.bio || "",
      });
    }
  }, []);

  // ✅ Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:8000/api/users/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ Update localStorage
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("✅ Profile updated!");

      navigate("/profile");
    } catch (err) {
  console.error("FULL ERROR:", err.response?.data || err.message);
  alert(err.response?.data?.error || "Failed to update profile");
}finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="pt-24 px-4 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-sm space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />

          <textarea
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;