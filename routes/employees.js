const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee'); // ✅ Correct import

// GET all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

// POST new employee
router.post('/', async (req, res) => {
  console.log("📩 Incoming data:", req.body)
  const { name, email, department, salary, status, startDate } = req.body;

  if (!name || !email || !department || !salary || !status || !startDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newEmployee = new Employee({ name, email, department, salary, status, startDate });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
  console.error("❌ Save failed:", error.message);
  console.error(error.stack);
}
});

// PUT employee
router.put('/:id', async (req, res) => {
  try {
    console.log("🔧 PUT /api/employees/:id", req.params.id);
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Employee not found' });
    res.json(updated);
  } catch (err) {
    console.error("❌ Update error:", err);
    res.status(500).json({ error: 'Failed to update employee' });
  }
});


// DELETE employee
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ error: 'Failed to delete employee' });
  }
});


module.exports = router;
