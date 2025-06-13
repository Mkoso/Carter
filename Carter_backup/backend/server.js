require('dotenv').config();
console.log('DATABASE_URL from .env:', process.env.DATABASE_URL);
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { connectDB } = require('./src/config/database');
const config = require('./src/config/config');
const authRoutes = require('./src/routes/auth');

const app = express();

// Connect to PostgreSQL
connectDB();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Security Middleware
app.use(helmet());

// CORS Configuration
const corsOptions = {
  origin: config.corsOrigin,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

// Logging Middleware
app.use(morgan('dev')); // Logger for HTTP requests

// API Routes
app.use('/api/auth', authRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Carter API is running...');
});

// Error handling middleware (optional, but good practice)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = config.port || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${config.nodeEnv} mode`);
}); 