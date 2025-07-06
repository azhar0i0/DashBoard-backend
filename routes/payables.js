const express = require('express');
const Payable = require('../models/Payable');

const router = express.Router();
// GET all payables
router.get('/', async (req, res) => {
  try {
    const payables = await Payable.find().sort({ dueDate: 1 });
    res.json(payables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new payable
router.post('/', async (req, res) => {
  try {
    const newPayable = new Payable(req.body);
    await newPayable.save();
    res.status(201).json(newPayable);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update a payable
router.put('/:id', async (req, res) => {
  try {
    const updated = await Payable.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(`error is happening , hehe : ${id}`)
  }
});

// DELETE a payable
router.delete('/:id', async (req, res) => {
  try {
    await Payable.findByIdAndDelete(req.params.id);
    res.json({ message: 'Payable deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;