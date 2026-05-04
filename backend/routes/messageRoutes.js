import express from "express";
import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { createNotification } from "./notificationRoutes.js";

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

    // ✅ NOTIFY RECIPIENT
    const conversation = await Conversation.findById(conversationId);
    if (conversation) {
        const recipient = conversation.members.find(m => m.toString() !== req.user.id);
        if (recipient) {
            await createNotification({
                recipient,
                sender: req.user.id,
                type: "message",
                message: "sent you a new message! 💬",
                link: "/messages",
            });
        }
    }

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

// ✅ Mark as read
router.put("/read/:conversationId", authMiddleware, async (req, res) => {
  try {
    await Message.updateMany(
      { conversationId: req.params.conversationId, sender: { $ne: req.user.id } },
      { isRead: true }
    );
    res.json({ message: "Messages marked as read" });
  } catch (err) {
    res.status(500).json({ error: "Failed to mark messages as read" });
  }
});

export default router;