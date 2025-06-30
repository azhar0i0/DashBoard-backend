// routes/receivables.js
const express = require('express');
const Receivable = require('../models/Receivable');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const receivables = await Receivable.find().sort({ dueDate: 1 });
    res.json(receivables);
  } catch (error) {
    console.error("❌ Error fetching receivables:", error);
    res.status(500).json({ error: error.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const newReceivable = new Receivable(req.body);
    await newReceivable.save();
    res.status(201).json(newReceivable);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Receivable.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Receivable.findByIdAndDelete(req.params.id);
    res.json({ message: 'Receivable deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
