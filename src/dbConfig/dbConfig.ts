import { Pool } from 'pg';

const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Disable strict SSL validation
  },
});

export default connection;
