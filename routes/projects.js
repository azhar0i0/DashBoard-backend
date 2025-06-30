const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Add new project
router.post('/', async (req, res) => {
  console.log("🔍 Received project data:", req.body);
  const { name, description, price, timePeriod, status, startDate, endDate, paymentStatus } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Name and Price are required' });
  }

  try {
    const newProject = new Project({
      name,
      description,
      price,
      timePeriod,
      status,
      startDate,
      endDate,
      paymentStatus
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save project' });
  }
});

// Update project
router.put('/:id', async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;
