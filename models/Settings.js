const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  companyName: String,
  userName: String,
  currency: String,
});

module.exports = mongoose.model('Settings', settingsSchema);
