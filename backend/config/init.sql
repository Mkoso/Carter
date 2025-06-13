-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create meetings table if it doesn't exist
CREATE TABLE IF NOT EXISTS meetings (
  id SERIAL PRIMARY KEY,
  hubspot_id VARCHAR(255) UNIQUE NOT NULL,
  user_id INTEGER REFERENCES users(id),
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  subject VARCHAR(255) NOT NULL,
  participants TEXT[] NOT NULL,
  duration INTEGER NOT NULL,
  recording_url TEXT,
  contact_ids TEXT[] NOT NULL,
  company_ids TEXT[] NOT NULL,
  deal_ids TEXT[],
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create calls table if it doesn't exist
CREATE TABLE IF NOT EXISTS calls (
  id SERIAL PRIMARY KEY,
  hubspot_id VARCHAR(255) UNIQUE NOT NULL,
  user_id INTEGER REFERENCES users(id),
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER NOT NULL,
  from_number VARCHAR(50) NOT NULL,
  to_number VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('completed', 'missed', 'failed')),
  contact_id VARCHAR(255) NOT NULL,
  company_id VARCHAR(255) NOT NULL,
  deal_id VARCHAR(255),
  recording_url TEXT,
  summary TEXT,
  direction VARCHAR(20) NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
); 