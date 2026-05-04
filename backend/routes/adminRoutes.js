import express from "express";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Swap from "../models/Swap.js";

const router = express.Router();

// ✅ GET ADMIN STATS
router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalListings = await Product.countDocuments();
    const successfulSwaps = await Swap.countDocuments({
      status: "accepted", // adjust if needed
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
});

// ✅ GET ALL USERS (for table)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    const usersWithListings = await Promise.all(
      users.map(async (user) => {
        const listings = await Product.countDocuments({
          owner: user._id,
        });

        return {
          _id: user._id,
          name: user.name,
          location: user.location || "N/A",
          listings,
        };
      })
    );

    res.json(usersWithListings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// ✅ GET ALL SWAPS (Monitoring)
router.get("/swaps", async (req, res) => {
  try {
    const swaps = await Swap.find()
      .populate("requester", "name")
      .populate("owner", "name")
      .populate("requestedProduct", "name")
      .populate("offeredProduct", "name")
      .sort({ createdAt: -1 });

    res.json(swaps);
  } catch (err) {
    res.status(500).json({ message: "Error fetching swaps" });
  }
});

// ✅ GET PLATFORM REPORTS (Analytics)
router.get("/reports", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalSwaps = await Swap.countDocuments();
    const successfulSwaps = await Swap.countDocuments({ status: "accepted" });

    // Simple category breakdown
    const categoryStats = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    res.json({
      summary: {
        totalUsers,
        totalProducts,
        totalSwaps,
        successfulSwaps,
        conversionRate: totalSwaps > 0 ? ((successfulSwaps / totalSwaps) * 100).toFixed(2) : 0,
      },
      categories: categoryStats,
    });
  } catch (err) {
    res.status(500).json({ message: "Error generating reports" });
  }
});

export default router;