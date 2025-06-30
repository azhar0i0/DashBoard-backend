const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Schema
const revenueSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  category: String,
  date: String,
  status: String,
});

const Revenue = mongoose.model('Revenue', revenueSchema);

// GET /api/revenue
router.get('/', async (req, res) => {
  try {
    const revenue = await Revenue.find();
    res.json(revenue);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch revenue" });
  }
});

// POST /api/revenue
router.post('/', async (req, res) => {
  try {
    const revenue = new Revenue(req.body);
    await revenue.save();
    res.status(201).json(revenue);
  } catch (error) {
    console.error("Error adding revenue:", error.message);
    res.status(500).json({ error: "Failed to add revenue" });
  }
});

// PUT /api/revenue/:id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Revenue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update revenue" });
  }
});

// DELETE /api/revenue/:id
router.delete('/:id', async (req, res) => {
  try {
    await Revenue.findByIdAndDelete(req.params.id);
    res.json({ message: "Revenue deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete revenue" });
  }
});

module.exports = router;
