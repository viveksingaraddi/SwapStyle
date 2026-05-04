import express from "express";
import Product from "../models/Product.js";
import authMiddleware from "../middleware/authMiddleware.js";
import mongoose from "mongoose";

const router = express.Router();


// ✅ CREATE PRODUCT (PROTECTED)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      name,
      brand,
      size,
      price,
      location,
      category,
      condition,
      description,
      images,
    } = req.body;

    // ✅ VALIDATION
    if (!name || !brand || !category || !size || !condition || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const product = new Product({
      name,
      brand,
      size,
      price: Number(price), // ✅ ensure number
      location,
      category,
      condition,
      description,
      images: images || [],
      user: req.user.id, // 🔥 CRITICAL FIX
    });

    await product.save();

    res.status(201).json(product);
  } catch (err) {
    console.error("CREATE PRODUCT ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// ✅ GET MY PRODUCTS (USED IN SWAP MODAL)
router.get("/my", authMiddleware, async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const products = await Product.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.error("FETCH MY PRODUCTS ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// ✅ GET ALL PRODUCTS (WITH FILTERING & PAGINATION)
router.get("/", async (req, res) => {
  try {
    const { category, location, page = 1, limit = 8 } = req.query;

    const query = {};
    if (category && category !== "all") {
      query.category = { $regex: new RegExp(category, "i") };
    }
    if (location) {
      query.location = { $regex: new RegExp(location, "i") };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find(query)
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    res.json({
      products,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
    });
  } catch (err) {
    console.error("FETCH PRODUCTS ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// ✅ GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ prevent crash on invalid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await Product.findById(id)
      .populate("user", "name email");

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("FETCH PRODUCT ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});


export default router;