const Receivable = require("../models/Receivable");

exports.getReceivables = async (req, res) => {
  const receivables = await Receivable.find();
  res.json(receivables);
};

exports.addReceivable = async (req, res) => {
  const { clientName, amount, dueDate, status, notes } = req.body;
  const receivable = new Receivable({ clientName, amount, dueDate, status, notes });
  await receivable.save();
  res.status(201).json(receivable);
};

exports.updateReceivable = async (req, res) => {
  const updated = await Receivable.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteReceivable = async (req, res) => {
  await Receivable.findByIdAndDelete(req.params.id);
  res.json({ message: "Receivable deleted" });
};
