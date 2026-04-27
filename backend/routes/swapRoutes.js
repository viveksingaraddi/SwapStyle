import express from "express";
import {
  createSwap,
  getUserSwaps,
  updateSwapStatus,
} from "../controllers/swapController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ CREATE swap
router.post("/", authMiddleware, createSwap);

// ✅ GET swaps (only current user)
router.get("/", authMiddleware, getUserSwaps);

// ✅ UPDATE swap status
router.put("/:id", authMiddleware, updateSwapStatus);

export default router;