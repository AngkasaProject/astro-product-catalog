import pg from "pg";
const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not configured");
export const pool = new Pool({ connectionString, max: 5, connectionTimeoutMillis: 5000 });
export async function ensureSchema() {
 await pool.query(`CREATE TABLE IF NOT EXISTS products (id BIGSERIAL PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL DEFAULT '', price NUMERIC(14,2) NOT NULL DEFAULT 0 CHECK(price >= 0), image_url TEXT NOT NULL DEFAULT '', created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`);
}