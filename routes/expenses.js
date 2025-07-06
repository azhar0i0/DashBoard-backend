const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  category: String,
  date: String,
  status: String,
});

const Expense = mongoose.model('Expense', expenseSchema);

// GET all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// POST new expense
router.post('/', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add expense' });
  }
});

// PUT/update existing expense
router.put('/:id', async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,  // Make sure this matches :id in the route
      req.body,
      { new: true }
    );
    
    if (!updatedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update expense' });
  }
});

// DELETE expense
router.delete('/:id', async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    
    if (!deletedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

module.exports = router;