import pool from '../config/db';

async function check() {
  try {
    console.log('Connecting to database...');
    const res = await pool.query('SELECT NOW() as now');
    console.log('Connected. Server time:', res.rows[0]?.now);
    process.exit(0);
  } catch (err) {
    const e = err as { message?: string; code?: string; detail?: unknown; stack?: string };
    console.error('Database connection failed:', {
      message: e.message,
      code: e.code,
      detail: e.detail,
      stack: e.stack,
    });
    process.exit(1);
  } finally {
    try {
      await pool.end();
    } catch (closeErr) {
      console.warn('Failed closing DB pool:', closeErr);
    }
  }
}

check();
