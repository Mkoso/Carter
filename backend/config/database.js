const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log('Supabase PostgreSQL connected successfully');
    client.release();
  } catch (error) {
    console.error('Supabase PostgreSQL connection error:', error);
    process.exit(1);
  }
};

module.exports = {
  pool,
  connectDB
}; 