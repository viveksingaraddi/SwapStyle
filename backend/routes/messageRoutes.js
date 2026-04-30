import express from "express";
import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// ✅ Send message
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { conversationId, text } = req.body;

    const message = await Message.create({
      conversationId,
      sender: req.user.id,
      text,
    });

    res.json(message);
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
});


// ✅ Get messages of a conversation
router.get("/:conversationId", authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export default router;