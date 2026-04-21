import express from "express";
import Swap from "../models/Swap.js";

const router = express.Router();

// CREATE SWAP
router.post("/", async (req, res) => {
  try {
    const swap = new Swap(req.body);
    await swap.save();
    res.json(swap);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL SWAPS
router.get("/", async (req, res) => {
  try {
    const swaps = await Swap.find().sort({ createdAt: -1 });
    res.json(swaps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;