import express from "express";
import Conversation from "../models/Conversation.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// ✅ Get all conversations of user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.user.id] },
    }).populate("members", "name");

    res.json(conversations);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
});

export default router;