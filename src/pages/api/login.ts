import type { APIRoute } from "astro";
import { login } from "../../lib/auth";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const password = String(form.get("password") ?? "");
  if (password.length > 500) return redirect("/admin/login?error=1", 303);
  try {
    if (await login(cookies, password)) return redirect("/admin", 303);
  } catch (error) {
    console.error("Admin login configuration error:", error);
  }
  return redirect("/admin/login?error=1", 303);
};