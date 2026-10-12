import type { APIRoute } from "astro";
import { isAdmin } from "../../../lib/auth";
import { ensureSchema, pool } from "../../../lib/db";

export const POST: APIRoute = async ({ request, cookies, params, redirect }) => {
  if (!(await isAdmin(cookies))) return redirect("/admin/login", 303);
  const id = Number(params.id);
  if (!Number.isSafeInteger(id) || id < 1) return new Response("ID produk tidak valid", { status: 400 });
  const form = await request.formData();
  const name = String(form.get("name") ?? "").trim();
  const description = String(form.get("description") ?? "").trim();
  const rawPrice = String(form.get("price") ?? "");
  const imageUrl = String(form.get("image_url") ?? "").trim();
  const price = Number(rawPrice);
  if (!name || name.length > 160 || description.length > 2000 || imageUrl.length > 1000 || !Number.isFinite(price) || price < 0 || !/^\d+(\.\d{1,2})?$/.test(rawPrice)) {
    return new Response("Data produk tidak valid", { status: 400 });
  }
  if (imageUrl) {
    try { if (!["http:", "https:"].includes(new URL(imageUrl).protocol)) throw new Error(); }
    catch { return new Response("URL gambar harus menggunakan HTTP atau HTTPS", { status: 400 }); }
  }
  await ensureSchema();
  const result = await pool.query(
    "UPDATE products SET name=$1, description=$2, price=$3, image_url=$4, updated_at=NOW() WHERE id=$5",
    [name, description, price, imageUrl, id]
  );
  if (result.rowCount === 0) return new Response("Produk tidak ditemukan", { status: 404 });
  return redirect("/admin?status=updated", 303);
};