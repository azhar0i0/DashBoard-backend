    const Revenue = require("../models/Revenue");

exports.getRevenue = async (req, res) => {
  const records = await Revenue.find();
  res.json(records);
};

exports.addRevenue = async (req, res) => {
  const { title, amount, source } = req.body;
  const record = new Revenue({ title, amount, source });
  await record.save();
  res.status(201).json(record);
};

exports.updateRevenue = async (req, res) => {
  const updated = await Revenue.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteRevenue = async (req, res) => {
  await Revenue.findByIdAndDelete(req.params.id);
  res.json({ message: "Revenue record deleted" });
};
