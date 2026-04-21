import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  size: String,
  price: Number,
  location: String,
  category: String,
  condition: String,
  description: String,
  images: [String],
}, { timestamps: true });

export default mongoose.model("Product", productSchema);