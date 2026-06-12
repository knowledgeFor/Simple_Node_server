import pool from '../config/db';

export async function initDb(): Promise<void> {
  const createUsers = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
  `;

  try {
    await pool.query(createUsers);
  } catch (err) {
    console.error('Failed to initialize database:', err);
    throw err;
  }
}

export default initDb;
