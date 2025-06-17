const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function test() {
  const { data, error } = await supabase.from('users').select('*');
  if (error) {
    console.error('Virhe backend-yhteydessä:', error);
  } else {
    console.log('Backend-yhteys toimii! Data:', data);
  }
}

test(); 