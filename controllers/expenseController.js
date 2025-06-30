const Expense = require("../models/Expense");

// GET all expenses
exports.getExpenses = async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
};

// POST new expense
exports.addExpense = async (req, res) => {
  const { title, amount, category } = req.body;
  const expense = new Expense({ title, amount, category });
  await expense.save();
  res.status(201).json(expense);
};

// PUT update expense
exports.updateExpense = async (req, res) => {
  const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// DELETE an expense
exports.deleteExpense = async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Expense deleted" });
};
