import mongoose from "mongoose";

const swapSchema = new mongoose.Schema({
  offeredItem: {
    name: String,
    image: String,
    price: Number,
  },
  requestedItem: {
    name: String,
    image: String,
    price: Number,
  },
  status: {
    type: String,
    default: "pending",
  },
}, { timestamps: true });

export default mongoose.model("Swap", swapSchema);