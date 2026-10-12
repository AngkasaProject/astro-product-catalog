import type { APIRoute } from "astro";
import { isAdmin } from "../../../../lib/auth";
import { ensureSchema, pool } from "../../../../lib/db";

export const POST: APIRoute = async ({ cookies, params, redirect }) => {
  if (!(await isAdmin(cookies))) return redirect("/admin/login", 303);
  const id = Number(params.id);
  if (!Number.isSafeInteger(id) || id < 1) return new Response("ID produk tidak valid", { status: 400 });
  await ensureSchema();
  await pool.query("DELETE FROM products WHERE id=$1", [id]);
  return redirect("/admin?status=deleted", 303);
};