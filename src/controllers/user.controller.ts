import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: 'Invalid id' });
    const user = await userService.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    const e = err as { code?: string; detail?: unknown };
    if (e.code === '23505') return res.status(409).json({ message: 'Conflict', detail: e.detail });
    next(err as unknown as Error);
  }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'name and email are required' });
    const emailRe = /\S+@\S+\.\S+/;
    if (!emailRe.test(email)) return res.status(400).json({ message: 'invalid email' });
    const user = await userService.create({ name, email });
    res.status(201).json(user);
  } catch (err) {
    const e = err as { code?: string };
    if (e.code === '23505') return res.status(409).json({ message: 'Email already exists' });
    next(err as unknown as Error);
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: 'Invalid id' });
    const { name, email } = req.body;
    if (email) {
      const emailRe = /\S+@\S+\.\S+/;
      if (!emailRe.test(email)) return res.status(400).json({ message: 'invalid email' });
    }
    if (name === undefined && email === undefined)
      return res.status(400).json({ message: 'nothing to update' });
    const user = await userService.update(id, { name, email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    const e = err as { code?: string };
    if (e.code === '23505') return res.status(409).json({ message: 'Email already exists' });
    next(err as unknown as Error);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: 'Invalid id' });
    const ok = await userService.remove(id);
    if (!ok) return res.status(404).json({ message: 'User not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export default { getUsers, getUser, createUser, updateUser, deleteUser };
