import Swap from "../models/Swap.js";
import Conversation from "../models/Conversation.js";
import { createNotification } from "../routes/notificationRoutes.js";


// CREATE SWAP
export const createSwap = async (req, res) => {
  try {
    const { owner, requestedProduct, offeredProduct } = req.body;

    const swap = await Swap.create({
      requester: req.user.id,
      owner,
      requestedProduct,
      offeredProduct,
      status: "pending",
    });

    // ✅ CHECK FOR EXISTING CONVERSATION (WhatsApp Style)
    let conversation = await Conversation.findOne({
      members: { $all: [req.user.id, owner] }
    });

    if (!conversation) {
      await Conversation.create({
        members: [req.user.id, owner],
        swap: swap._id,
      });
    } else {
      conversation.swap = swap._id;
      await conversation.save();
    }

    // ✅ NOTIFY OWNER
    await createNotification({
      recipient: owner,
      sender: req.user.id,
      type: "swap_request",
      message: "received a new swap request! 🎁",
      link: "/swaps",
    });

    res.status(201).json(swap);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create swap" });
  }
};

// GET USER SWAPS
export const getUserSwaps = async (req, res) => {
  try {
    const userId = req.user.id;

    const swaps = await Swap.find({
      $or: [{ requester: userId }, { owner: userId }],
    })
      .populate("requester", "name")
      .populate("owner", "name")
      .populate("requestedProduct")
      .populate("offeredProduct")
      .sort({ createdAt: -1 });

    res.json(swaps);
  } catch (err) {
    res.status(500).json({ message: "Error fetching swaps" });
  }
};

// UPDATE STATUS (ONLY OWNER CAN)
export const updateSwapStatus = async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id);

    if (!swap) {
      return res.status(404).json({ error: "Swap not found" });
    }

    // 🔥 KEY FIX: only owner can accept/reject
    if (swap.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    swap.status = req.body.status;
    await swap.save();

    // ✅ NOTIFY REQUESTER
    await createNotification({
      recipient: swap.requester,
      sender: req.user.id,
      type: swap.status === "accepted" ? "swap_accepted" : "swap_rejected",
      message: `your swap request has been ${swap.status}! ${swap.status === "accepted" ? "🎉" : "😔"}`,
      link: "/swaps",
    });

    res.json(swap);
  } catch (err) {
    res.status(500).json({ error: "Failed to update swap" });
  }
};