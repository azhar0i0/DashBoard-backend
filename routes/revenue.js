const express = require('express');
const Revenue = require('../models/Revenue');

const router = express.Router();

// ✅ Get all revenue entries
router.get('/', async (req, res) => {
  try {
    const revenues = await Revenue.find().sort({ date: -1 }); // sort by latest
    res.json(revenues);
  } catch (error) {
    console.error("❌ Error fetching revenues:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Add new revenue
router.post('/', async (req, res) => {
  try {
    const newRevenue = new Revenue(req.body);
    await newRevenue.save();
    res.status(201).json(newRevenue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Update a revenue entry
router.put('/:id', async (req, res) => {
  try {
    const updated = await Revenue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Delete a revenue entry
router.delete('/:id', async (req, res) => {
  try {
    await Revenue.findByIdAndDelete(req.params.id);
    res.json({ message: 'Revenue deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
