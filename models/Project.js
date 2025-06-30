const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  timePeriod: { type: String },
  status: { type: String, enum: ['planning', 'in-progress', 'completed'], default: 'planning' },
  startDate: { type: Date },
  endDate: { type: Date },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
