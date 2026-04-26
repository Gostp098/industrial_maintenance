// backend/init-db.js
const { Pool } = require('pg');

// Log environment variables (without showing password)
console.log('Database configuration:');
console.log(`  DB_USER: ${process.env.DB_USER || 'NOT SET'}`);
console.log(`  DB_HOST: ${process.env.DB_HOST || 'NOT SET'}`);
console.log(`  DB_NAME: ${process.env.DB_NAME || 'NOT SET'}`);
console.log(`  DB_PORT: ${process.env.DB_PORT || 'NOT SET'}`);
console.log(`  DB_PASSWORD: ${process.env.DB_PASSWORD ? '***SET***' : 'NOT SET'}`);

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'industrial_maintenance',
  password: process.env.DB_PASSWORD || 'mariem',
  port: parseInt(process.env.DB_PORT || '5432'),
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS requests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    service VARCHAR(100) NOT NULL,
    type VARCHAR(50) DEFAULT 'service',
    urgency VARCHAR(50) DEFAULT 'medium',
    description TEXT NOT NULL,
    preferred_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

async function initDatabase() {
  console.log('\nInitializing database...');
  try {
    // Test connection first
    await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful');
    
    // Create table
    await pool.query(createTableQuery);
    console.log('✅ Table "requests" is ready');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    console.error('\nTroubleshooting tips:');
    console.error('1. Make sure PostgreSQL is running');
    console.error('2. Check if the database exists');
    console.error('3. Verify credentials are correct');
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Only run if called directly
if (require.main === module) {
  initDatabase();
}

module.exports = { initDatabase };