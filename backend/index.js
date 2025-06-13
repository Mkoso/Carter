const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const { connectDB } = require('./config/database');
const authRouter = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use('/api/auth', authRouter);

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
}

// SPA fallback - palauttaa index.html kaikille reiteille
app.get('*', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  } else {
    res.redirect('http://localhost:5174' + req.url);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 