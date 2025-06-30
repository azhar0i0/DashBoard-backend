const Payable = require("../models/Payable");

exports.getPayables = async (req, res) => {
  const payables = await Payable.find();
  res.json(payables);
};

exports.addPayable = async (req, res) => {
  const { vendorName, amount, dueDate, status, notes } = req.body;
  const payable = new Payable({ vendorName, amount, dueDate, status, notes });
  await payable.save();
  res.status(201).json(payable);
};

exports.updatePayable = async (req, res) => {
  const updated = await Payable.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deletePayable = async (req, res) => {
  await Payable.findByIdAndDelete(req.params.id);
  res.json({ message: "Payable deleted" });
};
