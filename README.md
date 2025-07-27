# POSH App Backend

This project supports both a Node.js backend (MVC structure) and a Python backend (FastAPI), along with a React Native frontend.

---

## Node.js Backend (MVC)

This backend will use a Model-View-Controller (MVC) structure. It is intended for handling additional business logic, webhooks, or custom endpoints that may be needed beyond Supabase's built-in features.

### Structure

- `node_backend/`
  - `controllers/` — Route logic
  - `models/` — Data models (if needed)
  - `routes/` — Express route definitions
  - `app.js` — Main entry point
  - `config/` — Configuration (e.g., Supabase keys)

### Initial Setup

1. Create a `node_backend/` directory in the project root (if not present).
2. Initialize Node.js:
   ```bash
   cd node_backend
   npm init -y
   npm install express cors dotenv @supabase/supabase-js
   ```
3. Create the folder structure as above.
4. Add your Supabase credentials to `.env` in `node_backend/`.

This backend is optional if you use only Supabase, but is useful for custom logic or integrations.

---

## Python Backend (FastAPI)

### Run the server

```bash
cd backend
uvicorn main:app --reload
```

### venv setup

```bash
venv/scripts/activate
```

---

## Frontend (React Native)

### Run the frontend

```bash
cd frontend
npx expo start
```

---

## Public URL (for tunneling, e.g., Pinggy)

```bash
ssh -p 443 -R0:127.0.0.1:8000 qr@a.pinggy.io
```
