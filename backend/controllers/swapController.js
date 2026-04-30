import Swap from "../models/Swap.js";
import Conversation from "../models/Conversation.js";


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

    await Conversation.create({
  members: [req.user.id, owner], // owner = other user
  swap: swap._id,
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

    res.json(swap);
  } catch (err) {
    res.status(500).json({ error: "Failed to update swap" });
  }
};