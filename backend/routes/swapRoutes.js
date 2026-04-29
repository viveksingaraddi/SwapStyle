import express from "express";
import {
  createSwap,
  getUserSwaps,
  updateSwapStatus,
} from "../controllers/swapController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import Swap from "../models/Swap.js";

const router = express.Router();


// ✅ CREATE swap
router.post("/", authMiddleware, createSwap);

// ✅ GET swaps (only current user)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const swaps = await Swap.find({
      $or: [
        { requester: req.user.id },
        { owner: req.user.id }, // 🔥 THIS LINE FIXES YOUR ISSUE
      ],
    })
      .populate("requestedProduct")
      .populate("offeredProduct")
      .populate("requester", "name")
      .populate("owner", "name")
      .sort({ createdAt: -1 });

    res.json(swaps);
  } catch (err) {
    console.error("FETCH SWAPS ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ UPDATE swap status
router.put("/:id", authMiddleware, updateSwapStatus);

export default router;