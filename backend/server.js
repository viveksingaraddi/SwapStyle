import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import swapRoutes from "./routes/swapRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// ✅ FIX: increase payload size ONCE (not twice)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cors());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/swaps", swapRoutes);
app.use("/api/users", userRoutes);

// ✅ Root
app.get("/", (req, res) => {
  res.send("API WORKING 🚀");
});

// ✅ DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

// ✅ Server
app.listen(8000, () => {
  console.log("Server running on port 8000");
});