# Astro Product Catalog

A small Indonesian product catalog built with Astro SSR, Node adapter, and PostgreSQL. Includes a password-protected admin dashboard to create, edit, and delete products, plus a JSON database health endpoint.

## Requirements
- Docker Engine + Docker Compose, or Coolify
- PostgreSQL 17
- Set secrets using environment variables; do not commit `.env`.

## Run locally with Docker Compose
1. Copy `.env.example` to `.env`.
2. Replace `DB_PASSWORD` and `ADMIN_PASSWORD` with long unique secrets.
3. Add this line to `.env`:
   `DB_PASSWORD=your_long_database_password`
4. Run `docker compose up -d --build`.
5. Open `http://localhost:4321`.
6. Admin dashboard: `http://localhost:4321/admin`.
7. Database check: `http://localhost:4321/health`.

## Deploy on Coolify
Recommended: deploy this repository as a Dockerfile-based application, and create PostgreSQL as a separate Coolify database resource.

1. Push this project to a Git repository.
2. In Coolify, open your project and choose **Add Resource → Application → Public/Private Repository**.
3. Choose the repository and select **Dockerfile** as the build pack (Dockerfile path `/Dockerfile`).
4. Add a PostgreSQL resource in the same project/environment. Keep it private; do not expose its database port publicly.
5. Copy the internal connection string from the Coolify PostgreSQL resource and set it as `DATABASE_URL` on the application. The database host must be the internal hostname/address supplied by Coolify, not `localhost`.
6. Set `ADMIN_PASSWORD` to a long unique password.
7. Expose application port `4321` in Coolify and assign a domain if desired.
8. Deploy.

The app creates its `products` table automatically when the app handles its first page/health request. For production, use a strong admin password and HTTPS. This starter is intended for a single administrator; it does not include multi-user roles or password-reset flows.

## Notes
- Product images are referenced by URL; image upload/storage is not included in this first version.
- `/health` returns JSON including the PostgreSQL connection status and product count.
- Docker Compose is provided for local testing; Coolify deployment can use the Dockerfile and a managed PostgreSQL resource.
