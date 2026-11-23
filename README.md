# Portofolio Sandi Setianto

Website portofolio single-page bergaya **Editorial Brutalist × Y2K Accents**, dibangun dengan **React 19, TypeScript (strict), Tailwind CSS v4, GSAP + ScrollTrigger, Lenis, dan Motion**.

## Menjalankan Proyek

```bash
npm install
npm run dev
```

Perintah verifikasi dan aset:

| Perintah | Kegunaan |
|---|---|
| `npm run dev` | Menjalankan dev server Vite |
| `npm run build` | Build produksi ke `dist/` |
| `npm run preview` | Preview hasil build produksi |
| `npm run typecheck` | Pemeriksaan TypeScript strict (`tsc --noEmit`) |
| `npm run lint` | Pemeriksaan ESLint (`--max-warnings 0`) |
| `npm run test` | Menjalankan unit test Vitest |
| `npm run check` | Menjalankan `typecheck && lint && test && build` |
| `npm run assets` | Menjalankan pipeline Python optimasi foto, sertifikat, dan OG image |

## Konfigurasi & Menjalankan Sanity Headless CMS

Folder admin **Sanity Studio** sudah disiapkan di `studio/` lengkap dengan schema `project` yang cocok dengan website portofolio ini.

1. Isi `VITE_CMS_PROJECT_ID` pada file `.env` di root proyek:

```env
VITE_CMS_PROJECT_ID=your_project_id
VITE_CMS_DATASET=production
VITE_CMS_API_VERSION=2025-02-19
# Kosongkan jika dataset public; jika private, gunakan token read-only saja.
VITE_CMS_TOKEN=
```

2. Di dashboard [sanity.io](https://www.sanity.io/manage) → **API → CORS Origins**, tambahkan `http://localhost:5173` dan `http://localhost:3333` (centang *Allow credentials* hanya untuk port Studio `3333`).
3. Instal dependensi Studio (cukup sekali) lalu jalankan Studio:

```bash
npm run studio:install
npm run studio
```

Jika `VITE_CMS_PROJECT_ID` kosong atau request gagal, aplikasi otomatis menggunakan data fallback dari `src/features/projects/projects.fallback.ts`.

### Skema Dokumen Sanity (`project`)

Buat dokumen bertipe `project` di Sanity Studio dengan field berikut (sesuai `PROJECTS_QUERY` di `src/features/projects/projects.service.ts`):

- `title` (`string`, required)
- `slug` (`slug`, required)
- `category` (`string`, required)
- `year` (`number`, required)
- `summary` (`text`, required)
- `coverImage` (`image`, optional — tambahkan field `alt: string`)
- `tags` (`array` of `string`)
- `liveUrl` (`url`, optional)
- `repoUrl` (`url`, optional)
- `featured` (`boolean`)
- `order` (`number`)

## Menambah Sertifikat Baru

1. Letakkan file sertifikat (PDF/PNG/JPEG) ke `asset/SERTIFIKAT/`.
2. Tambahkan pemetaan slug ke `CERTIFICATE_SOURCES` di `scripts/build-certificates.py`.
3. Jalankan `npm run assets` (membutuhkan Python + PyMuPDF + Pillow). Script bersifat idempoten dan akan menghasilkan WebP 480px (`-thumb.webp`), 1600px (`-full.webp`), serta memperbarui `src/assets/certificates/manifest.json`.
4. Tambahkan entri baru di `src/content/certificates.ts` (untuk sertifikat Dicoding gunakan helper `createDicodingCertificate`).

## Mengisi Data Pribadi (`[ISI]`)

Seluruh placeholder data pribadi dikumpulkan di:
- `src/content/profile.ts` — email, tautan LinkedIn/GitHub/Instagram, CV PDF, dan tahun belajar.
- `src/content/certificates.ts` — tahun lomba fotografi (`juara-2-fotografi.issuedAt`).
- `src/features/projects/projects.fallback.ts` — proyek contoh jika belum menghubungkan Sanity CMS.
