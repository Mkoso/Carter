const { Client } = require('pg');
require('dotenv').config();

console.log('Yksinkertainen yhteystesti alkaa...');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function testConnection() {
  try {
    await client.connect();
    console.log('Yhteys onnistui!');
    const res = await client.query("SELECT NOW() as aika");
    console.log('Tietokannan aika:', res.rows[0].aika);
    await client.end();
  } catch (err) {
    console.error('Virhe yhteydessä:', err);
    process.exit(1);
  }
}

testConnection(); 