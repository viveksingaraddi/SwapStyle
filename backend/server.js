import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import productRoutes from "./routes/productRoutes.js";
import swapRoutes from "./routes/swapRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";

dotenv.config();

// ✅ 1. CREATE EXPRESS APP FIRST
const app = express();

// ✅ 2. CREATE HTTP SERVER
const server = http.createServer(app);

// ✅ 3. INIT SOCKET.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// ✅ 4. MIDDLEWARES
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors());

// ✅ 5. ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/swaps", swapRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/conversations", conversationRoutes);

// ✅ ROOT
app.get("/", (req, res) => {
  res.send("API WORKING 🚀");
});

// ✅ 6. SOCKET LOGIC
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // join a specific conversation room
  socket.on("joinConversation", (conversationId) => {
    socket.join(conversationId);
  });

  // send message to that room
  socket.on("sendMessage", (data) => {
    socket.to(data.conversationId).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ✅ 7. DB CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("DB Error:", err));

// ✅ 8. START SERVER (ONLY ONCE!)
server.listen(8000, () => {
  console.log("Server running on port 8000 🚀");
});