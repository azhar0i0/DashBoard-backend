const mongoose = require('mongoose');

const receivableSchema = new mongoose.Schema({
  client: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  dueDate: { type: String, required: true },
  status: { type: String, enum: ['pending', 'received', 'overdue'], default: 'pending' },
  date: { type: String }, // If you’re using it in frontend
});

module.exports = mongoose.model('Receivable', receivableSchema);
