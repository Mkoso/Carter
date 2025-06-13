require('dotenv').config();
console.log('DATABASE_URL from .env:', process.env.DATABASE_URL);
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { connectDB, pool } = require('./config/database');

const app = express();

// Connect to PostgreSQL
connectDB();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Carter API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 