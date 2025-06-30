const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Error:", err));


const expenseRoutes = require('./routes/expenses');
const revenueRoutes = require('./routes/revenue');
const employeeRoutes = require('./routes/employees');
const projectRoutes = require('./routes/projects');
const receivablesRoutes = require('./routes/receivables');
const payablesRoutes = require('./routes/payables');
const settingsRoutes = require('./routes/settings');

app.use('/api/projects', projectRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/revenue', revenueRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/receivables', receivablesRoutes);
app.use('/api/payables', payablesRoutes);
app.use('/api/settings', settingsRoutes);

// Settings
app.get('/api/settings', (req, res) => {
  res.json({ currency: 'USD' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
