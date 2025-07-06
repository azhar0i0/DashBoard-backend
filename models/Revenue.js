const mongoose = require('mongoose');

const revenueSchema = new mongoose.Schema({
  name: String,
  description: String,
  amount: Number,
  date: {
    type: Date,
    default: Date.now
  },
  category: String,
  status: {
    type: String,
    default: 'active'
  }
});

module.exports = mongoose.model('Revenue', revenueSchema);
