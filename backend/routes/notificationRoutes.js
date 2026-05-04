import express from "express";
import Notification from "../models/Notification.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ GET ALL NOTIFICATIONS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user.id })
      .sort({ createdAt: -1 })
      .populate("sender", "name");
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

// ✅ MARK ALL AS READ
router.put("/read-all", authMiddleware, async (req, res) => {
  try {
    await Notification.updateMany({ recipient: req.user.id }, { isRead: true });
    res.json({ message: "Marked all as read" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update notifications" });
  }
});

// ✅ CREATE NOTIFICATION (Helper logic to be used in other routes)
export const createNotification = async ({ recipient, sender, type, message, link }) => {
  try {
    await Notification.create({ recipient, sender, type, message, link });
  } catch (err) {
    console.error("NOTIFICATION ERROR:", err);
  }
};

export default router;
