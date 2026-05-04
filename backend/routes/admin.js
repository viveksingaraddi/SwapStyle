import User from "../models/User.js";
import Product from "../models/Product.js";
import Swap from "../models/Swap.js";

export const getAdminStats = async (req, res) => {
  try {
    // ✅ COUNT USERS (exclude admins if needed)
    const totalUsers = await User.countDocuments({
      isAdmin: { $ne: true }, // optional
    });

    // ✅ COUNT PRODUCTS
    const totalListings = await Product.countDocuments();

    // ✅ SUCCESSFUL SWAPS
    const successfulSwaps = await Swap.countDocuments({
      status: "accepted", // or "completed" based on your schema
    });

    res.json({
      totalUsers,
      totalListings,
      successfulSwaps,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching stats" });
  }
};