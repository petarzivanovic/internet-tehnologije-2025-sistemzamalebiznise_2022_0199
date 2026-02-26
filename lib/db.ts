import { Pool } from 'pg';

if (!process.env.DATABASE_URL) {
  console.error('KRITIČNA GREŠKA: DATABASE_URL nije postavljena!');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);