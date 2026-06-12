import dotenv from 'dotenv';
import app from './app';
import initDb from './db/init';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function start() {
  await initDb();
  app.listen(Number(PORT), () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
