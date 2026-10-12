# Astro Product Catalog — Tailwind CSS v4
Katalog produk Astro SSR dengan PostgreSQL dan dashboard admin, menggunakan Tailwind CSS v4 dan desain utility yang terinspirasi shadcn/ui.

## Coolify
- Build pack: Dockerfile
- Dockerfile location: `/Dockerfile`
- Exposed port: `4321`
- Environment variables: `DATABASE_URL` dan `ADMIN_PASSWORD`
- Database PostgreSQL dibuat sebagai resource terpisah di Coolify; gunakan URL internal dari Coolify.
- `/health` memeriksa koneksi PostgreSQL.
- Gambar produk saat ini menggunakan URL eksternal; upload gambar belum termasuk.

## Origin/CSRF
Jangan menonaktifkan pemeriksaan origin Astro secara global untuk memperbaiki error POST. Jika form POST melalui Cloudflare Tunnel ditolak, periksa domain publik, header `Host`/`Origin`, dan konfigurasi proxy sebelum mengubah perlindungan keamanan.
