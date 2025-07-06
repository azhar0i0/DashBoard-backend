require('dotenv').config(); // This MUST be at the very top

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Configuration checks
console.log('🔧 Environment Variables Loaded:', {
  MONGO_URI: process.env.MONGO_URI ? '✅ Present' : '❌ Missing',
  PORT: process.env.PORT || '5000 (default)'
});

// Middleware Setup
app.use(cors({
  origin: '*', // In production, replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Enhanced MongoDB Connection
const connectToDatabase = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MongoDB connection URI is not defined in environment variables');
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout for initial connection
      socketTimeoutMS: 45000 // 45 seconds timeout for operations
    });

    console.log('✅ MongoDB Connected Successfully');
    console.log(`   Host: ${mongoose.connection.host}`);
    console.log(`   Database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    console.log('   Please check:');
    console.log('   1. Your .env file has MONGO_URI');
    console.log('   2. MongoDB Atlas cluster is running');
    console.log('   3. Your IP is whitelisted in Atlas');
    console.log('   4. Network allows outbound connections');
    process.exit(1); // Exit with failure
  }
};

// Initialize Database Connection
connectToDatabase();

// Route Imports
const expenseRoutes = require('./routes/expenses');
const revenueRoutes = require('./routes/revenue');
const employeeRoutes = require('./routes/employees');
const projectRoutes = require('./routes/projects');
const receivablesRoutes = require('./routes/receivables');
const payablesRoutes = require('./routes/payables');
const settingsRoutes = require('./routes/settings');

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/revenue', revenueRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/receivables', receivablesRoutes);
app.use('/api/payables', payablesRoutes);
app.use('/api/settings', settingsRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date()
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('⚠️ Server Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Database Status: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Connecting...'}`);
});