const { pool } = require('./config/database');

console.log('Testi alkaa...');

async function testDatabase() {
  try {
    // Testataan ensin tietokantayhteyttä
    const client = await pool.connect();
    console.log('Tietokantayhteys toimii!');

    // Haetaan kaikki taulut tietokannasta
    const tablesQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    
    const tablesResult = await client.query(tablesQuery);
    console.log('\nTietokannassa olevat taulut:');
    console.log(tablesResult.rows);

    // Jos tauluja löytyi, tehdään esimerkkikysely ensimmäiseen tauluun
    if (tablesResult.rows.length > 0) {
      const firstTable = tablesResult.rows[0].table_name;
      const sampleQuery = `SELECT * FROM ${firstTable} LIMIT 5`;
      const sampleResult = await client.query(sampleQuery);
      console.log(`\nEsimerkkitulokset taulusta ${firstTable}:`);
      console.log(sampleResult.rows);
    }

    client.release();
  } catch (error) {
    console.error('Virhe tietokantakyselyssä:', error);
  } finally {
    // Suljetaan pool
    await pool.end();
  }
}

// Suoritetaan testi
testDatabase(); 