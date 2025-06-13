const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '123mikkos',
  host: 'localhost',
  port: 5432,
  database: 'carterdb'
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log('PostgreSQL connected successfully');
    client.release();
  } catch (error) {
    console.error('PostgreSQL connection error:', error);
    process.exit(1);
  }
};

module.exports = { pool, connectDB }; 