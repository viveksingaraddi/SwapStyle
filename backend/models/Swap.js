import mongoose from "mongoose";

const swapSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    requestedProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    offeredProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Swap", swapSchema);