const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://mjchjuarnxzafpxvlvpt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qY2hqdWFybnh6YWZweHZsdnB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4MTcyMzYsImV4cCI6MjA2NTM5MzIzNn0._u3sfxaUOvRtUFFAIjeg95C0LKklkDiBD0E_5MqOHUk';

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  // Lisää uusi käyttäjä (muokkaa sarakkeet taulusi mukaan)
  const { data: insertData, error: insertError } = await supabase
    .from('user')
    .insert([
      { name: 'Testikäyttäjä', email: 'testi@example.com' }
    ]);

  if (insertError) {
    console.error('Lisäysvirhe:', insertError);
  } else {
    console.log('Lisätty:', insertData);
  }

  // Hae kaikki käyttäjät
  const { data, error } = await supabase
    .from('user')
    .select('*');

  if (error) {
    console.error('Hakivirhe:', error);
  } else {
    console.log('Kaikki käyttäjät:', data);
  }
}

test(); 