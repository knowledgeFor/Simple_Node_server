import { Express } from 'express';
import userRoutes from './user.routes';

export default function registerRoutes(app: Express) {
  app.use('/api/users', userRoutes);
  app.get('/', (req, res) => res.json({ ok: true, routes: ['/api/users'] }));
}
