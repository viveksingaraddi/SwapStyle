import express from "express";

const router = express.Router();

const baseValues = {
  Jackets: 50,
  Tops: 20,
  Jeans: 40,
  Shoes: 60,
  Sweaters: 35,
  Dresses: 45,
  Skirts: 30,
  Suits: 100,
  Gowns: 120,
  "Formal Wear": 80,
  Accessories: 15,
};

const conditionMultipliers = {
  New: 1.2,
  Good: 1.0,
  Used: 0.7,
};

const premiumBrands = ["Nike", "Adidas", "Zara", "Levi's", "Gucci", "Prada"];

router.get("/calculate", (req, res) => {
  const { category, brand, condition } = req.query;

  if (!category || !condition) {
    return res.status(400).json({ error: "Missing category or condition" });
  }

  let value = baseValues[category] || 25;

  // Multiplier for condition
  value *= conditionMultipliers[condition] || 1.0;

  // Premium brand boost
  if (brand && premiumBrands.some(b => brand.toLowerCase().includes(b.toLowerCase()))) {
    value *= 1.5;
  }

  res.json({ estimatedValue: Math.round(value) });
});

export default router;
