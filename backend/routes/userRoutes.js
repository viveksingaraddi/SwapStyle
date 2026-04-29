import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ UPDATE PROFILE
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { name, location, bio } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, location, bio },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

export default router;