import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import swapRoutes from "./routes/swapRoutes.js";
import authRoutes from "./routes/authRoutes.js";



dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("API WORKING 🚀");
});

// ✅ Routes
app.use("/api/products", productRoutes);
app.use("/api/swaps", swapRoutes);

// ✅ DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

// ✅ Server
app.listen(8000, () => {
  console.log("Server running on port 8000");
});