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
  user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},
}, { timestamps: true });


export default mongoose.model("Product", productSchema);