// index.js or server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // for .env support

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Use middlewares
app.use(cors()); // 💥 This fixes the CORS issue
app.use(express.json()); // To parse JSON

// ✅ Connect to MongoDB (edit this with your connection string)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("Mongo Error:", err));

// ✅ Revenue Route
const revenueRoutes = require('./routes/revenue');
app.use('/api/revenue', revenueRoutes); // This makes /api/revenue work

// ✅ Optional default route
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
