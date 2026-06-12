import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import registerRoutes from './routes/index.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger';

dotenv.config();

const app = express();

app.use(express.json());

registerRoutes(app);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  void _next;
  console.error(err);
  const e = err as { code?: string; detail?: unknown; status?: number; message?: string };
  if (e && e.code === '23505') {
    return res
      .status(409)
      .json({ error: 'Conflict', detail: e.detail ?? 'Unique constraint violation' });
  }
  const status = e?.status ?? 500;
  const message = e?.message ?? 'Internal Server Error';
  res.status(status).json({ error: message });
});

export default app;
