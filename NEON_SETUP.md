# Neon + Drizzle Setup

## 1) Add environment file

Create `.env` in the project root based on `.env.example`:

```env
DATABASE_URL=your_neon_connection_string_here
API_PORT=8787
ADMIN_USERNAME=owner
ADMIN_PASSWORD=your_admin_password_here
JWT_SECRET=your_long_random_secret_here
FRONTEND_URL=http://localhost:5173
VITE_API_BASE_URL=http://localhost:8787
```

`JWT_SECRET` must be a long random string in production.

## 2) Generate and run migrations

```bash
npm run db:generate
npm run db:migrate
```

## 3) Seed initial product data

```bash
npm run db:seed
```

## 4) Run the app

Start API server:

```bash
npm run dev:api
```

In another terminal start Vite frontend:

```bash
npm run dev
```

Frontend requests to `/api/*` are proxied to `http://localhost:8787`.

In production, set `VITE_API_BASE_URL` to your deployed API URL.

