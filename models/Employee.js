const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  salary: Number,
  status: { type: String, enum: ['active', 'inactive'] },
  startDate: Date
});

module.exports = mongoose.model('Employee', employeeSchema);
