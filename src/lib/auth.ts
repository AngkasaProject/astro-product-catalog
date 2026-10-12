import type { AstroCookies } from "astro";

const COOKIE_NAME = "catalog_admin";
const encoder = new TextEncoder();

async function digest(value: string) {
  const data = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  return Array.from(new Uint8Array(data)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function createSessionToken() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("ADMIN_PASSWORD is not configured");
  return digest(`astro-product-catalog:${password}:admin-session-v1`);
}

export async function isAdmin(cookies: AstroCookies) {
  const stored = cookies.get(COOKIE_NAME)?.value;
  if (!stored) return false;
  const expected = await createSessionToken();
  return stored === expected;
}

export async function login(cookies: AstroCookies, suppliedPassword: string) {
  const configured = process.env.ADMIN_PASSWORD;
  if (!configured) throw new Error("ADMIN_PASSWORD is not configured");
  if (suppliedPassword.length === 0 || suppliedPassword !== configured) return false;
  cookies.set(COOKIE_NAME, await createSessionToken(), {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return true;
}

export function logout(cookies: AstroCookies) {
  cookies.delete(COOKIE_NAME, { path: "/" });
}