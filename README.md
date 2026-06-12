# Simple_Node_server

## Run guide

Prerequisites:
- Node.js (16+)
- A PostgreSQL database and `DATABASE_URL` (Railway or local)

Install dependencies:

```bash
npm install
```

Set environment (example):

Windows PowerShell:
```powershell
# $env:DATABASE_URL = "postgresql://user:pass@host:5432/db"
# $env:PORT = 5001
```

Linux / macOS:
```bash
# DATABASE_URL="postgresql://user:pass@host:5432/db" PORT=5001
```

Check DB connectivity (quick test):

```bash
npm run check-db
```

Run in development (auto-reload):

```bash
npm run dev
```

Build and run production bundle:

```bash
npm run build
npm start
```

Open API docs (Swagger UI):

- After starting the server, visit: http://localhost:5001/api-docs

Notes:
- If you're using Railway and see a host like `*.railway.internal`, run `railway connect` or use the public connection URL from the Railway dashboard so `DATABASE_URL` is resolvable from your current machine.
- See `src/config/db.ts` for SSL and `DB_SSL` toggle behavior.

## Using Railway

- When deploying to Railway, add a PostgreSQL plugin from the Railway dashboard. Railway provides a connection string under the project's "Connect" section.
- For apps running inside Railway the internal host (e.g. `*.railway.internal`) is resolvable. For local development prefer the public connection string from Railway, or create a tunnel with the Railway CLI:

  1. Install Railway CLI (optional):

	  ```bash
	  npm i -g @railway/cli
	  # or use the installer from https://railway.app
	  ```

  2. Start a local tunnel (if you need to reach the internal host):

	  ```bash
	  railway connect
	  ```

	  `railway connect` makes the internal service reachable from your machine while the tunnel is active. If you prefer not to use a tunnel, copy the public `DATABASE_URL` from the dashboard into your local environment.

- On Railway set environment variables in the project Settings → Variables panel. Add `DATABASE_URL` (the connection string) and optionally `DB_SSL=true` if your DB requires SSL.

- Example: to set variables via CLI:

```bash
railway variables set DATABASE_URL="<your-connection-string>" DB_SSL=true
```

- Note: If your `DATABASE_URL` uses a `*.railway.internal` host, the app will only connect from within Railway (or while `railway connect` is running locally).

## Contributor workflow

This repo includes local pre-add checks and Git hooks to keep commits high-quality. Follow these steps when preparing changes:

1. Run the fast pre-add checks (lints + formatting):

```bash
npm run add:check
```

This runs a fast ESLint config and Prettier to auto-fix issues. It does not stage files automatically — run `git add .` after verifying the changes.

2. Stage files and commit:

```bash
git add .
git commit -m "Your message"
```

Husky pre-commit hook will run `tsc --noEmit` and `lint-staged` before the commit is finalized. If the commit is blocked, fix the reported issues and try again.

3. Push and open a PR. CI runs the full checks (typecheck, lint, build) and will report failures on the PR.

Tips and notes:
- If you need a faster local flow, `npm run add:check` uses a lighter ESLint configuration; the repo's strict ESLint config is enforced by pre-commit and CI.
- To skip hooks (not recommended): `git commit --no-verify -m "msg"`.
- Do NOT commit `.env` or secrets. Use Railway or your CI provider to store environment variables securely.



