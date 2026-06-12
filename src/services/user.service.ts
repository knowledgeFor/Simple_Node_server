import pool from '../config/db';

export interface User {
  id?: number;
  name: string;
  email: string;
  created_at?: string;
}

export async function findAll(): Promise<User[]> {
  const res = await pool.query('SELECT id, name, email, created_at FROM users ORDER BY id');
  return res.rows;
}

export async function findById(id: number): Promise<User | null> {
  const res = await pool.query('SELECT id, name, email, created_at FROM users WHERE id = $1', [id]);
  return res.rows[0] ?? null;
}

export async function create(user: Pick<User, 'name' | 'email'>): Promise<User> {
  const res = await pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email, created_at',
    [user.name, user.email],
  );
  return res.rows[0];
}

export async function update(
  id: number,
  user: Partial<Pick<User, 'name' | 'email'>>,
): Promise<User | null> {
  const fields: string[] = [];
  const values: unknown[] = [];
  let idx = 1;

  if (user.name !== undefined) {
    fields.push(`name = $${idx++}`);
    values.push(user.name);
  }
  if (user.email !== undefined) {
    fields.push(`email = $${idx++}`);
    values.push(user.email);
  }

  if (fields.length === 0) return findById(id);

  values.push(id);
  const q = `UPDATE users SET ${fields.join(
    ', ',
  )} WHERE id = $${idx} RETURNING id, name, email, created_at`;
  const res = await pool.query(q, values);
  return res.rows[0] ?? null;
}

export async function remove(id: number): Promise<boolean> {
  const res = await pool.query('DELETE FROM users WHERE id = $1', [id]);
  return (res.rowCount ?? 0) > 0;
}

export default { findAll, findById, create, update, remove };
