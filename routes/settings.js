const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

// Get Settings
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({
        companyName: '',
        userName: '',
        currency: 'USD'
      });
    }
    res.json(settings);
  } catch (err) {
    console.error('❌ Settings GET error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Update Settings
router.post('/', async (req, res) => {
  const { companyName, userName, currency } = req.body;
  try {
    let settings = await Settings.findOne();
    if (settings) {
      settings.companyName = companyName;
      settings.userName = userName;
      settings.currency = currency;
      await settings.save();
    } else {
      settings = await Settings.create({ companyName, userName, currency });
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
