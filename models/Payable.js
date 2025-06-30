const mongoose = require('mongoose');

const PayableSchema = new mongoose.Schema({
  date: { type: String, required: true },
  vendor: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'paid', 'overdue'],
    default: 'pending',
  },
}, { timestamps: true });

const Payable = mongoose.model('Payable', PayableSchema);
module.exports = Payable;