import type { AstroCookies } from "astro";
const COOKIE = "catalog_admin";
async function token() {
 const password = process.env.ADMIN_PASSWORD;
 if (!password) throw new Error("ADMIN_PASSWORD is not configured");
 const data = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`astro-product-catalog:${password}:admin-session-v1`));
 return Array.from(new Uint8Array(data)).map(v => v.toString(16).padStart(2,"0")).join("");
}
export async function isAdmin(cookies: AstroCookies) { return cookies.get(COOKIE)?.value === await token(); }
export async function login(cookies: AstroCookies, supplied: string) {
 if (!process.env.ADMIN_PASSWORD || supplied !== process.env.ADMIN_PASSWORD) return false;
 cookies.set(COOKIE, await token(), { httpOnly:true, secure: import.meta.env.PROD, sameSite:"lax", path:"/", maxAge:43200 }); return true;
}
export function logout(cookies: AstroCookies) { cookies.delete(COOKIE,{path:"/"}); }