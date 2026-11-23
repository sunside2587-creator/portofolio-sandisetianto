# CONTEXT — Portofolio Sandi Setianto

## Ringkasan Proyek
Website portofolio pribadi single-page untuk **Sandi Setianto** (Mahasiswa Teknik Informatika UIN Sultan Syarif Kasim Riau, Pekanbaru) dengan role **Fullstack Developer** dan tagline hero **CODE THAT CONNECTS**.
Tema visual: **Editorial Brutalist × Y2K Accents** (palet krem/hitam/merah, tipografi condensed besar, grid 1px + crosshair `+`, wordmark outline terdistorsi, galeri kartu mengipas, dan cursor preview sertifikat).

## Dokumen Acuan
- `PRD_PORTOFOLIOSANDI.md` (v1.1) — acuan produk, kebutuhan fungsional, arsitektur, dan standar Clean Code React 19 + TypeScript.
- `prompt.md` — instruksi implementasi, alur fase, dan aturan aset.
- `.agents/skills/` & `.claude/skills/motion/` — pedoman TypeScript, React composition, Vercel performance, UX/UI, Karpathy guidelines, dan Motion.

## Design Tokens (`src/styles/globals.css`)
- `--color-paper`: `#F4ECE3` (background utama)
- `--color-ink`: `#0E0E0E` (teks utama, section gelap, footer)
- `--color-signal`: `#C21415` (aksen merah; kontras 5,3:1 di atas paper, gunakan hanya untuk teks besar/garis di atas ink)
- `--color-muted`: `#5F5A55` (label / meta)
- `--color-line`: `rgb(14 14 14 / 0.15)` (divider grid 1px)
- Display font: `"Anton", Impact, "Arial Narrow", sans-serif` (`@fontsource/anton`)
- Body/label font: `"Inter Variable", system-ui, sans-serif` (`@fontsource-variable/inter`)

## Deviasi dari PRD yang Disetujui
1. `Project.coverImage` dibuat **opsional**: jika belum ada gambar proyek, `ProjectCard` merender *typographic cover* (nomor + judul di atas permukaan varian).
2. `Certificate.issuedAt` bertipe `string | null` (`null` khusus untuk lomba fotografi yang tahunnya belum diisi). Saat sorting, `null` ditaruh paling akhir dan formatter menampilkan `"—"`.
3. Statistik About diturunkan murni dari data: Certificates (19), Courses (11), Awards (3), Projects (jumlah proyek aktif). Stat "tahun belajar" ditunda hingga pemilik mengisi placeholder.
4. Kartu Gallery menggunakan foto profil, thumbnail sertifikat, dan kartu monogram merah (bukan thumbnail proyek karena belum ada aset gambar proyek).
5. Menggunakan hook kustom `useGsapContext` (`gsap.context` + `revert`) tanpa paket `@gsap/react`.
6. Canonical URL dan `sitemap.xml` ditunda sampai domain produksi tersedia; `robots.txt` dan JSON-LD `Person` tetap disertakan.

## Struktur Folder Utama
- `scripts/` — script Python idempoten untuk optimasi foto, render PDF/foto sertifikat ke WebP, dan pembuatan OG image.
- `public/certificates/` — salinan PDF sertifikat Dicoding yang diizinkan untuk diunduh.
- `src/types/` — kontrak tipe immutable (`common`, `project`, `certificate`, `cms`, `content`).
- `src/lib/` — helper murni, env parser (`env.ts`), GSAP setup, formatter, client Sanity (`fetch`).
- `src/content/` — seluruh copywriting dan data statis (`profile`, `services`, `navigation`, `images`, `certificates`, `gallery`).
- `src/hooks/` — `useMediaQuery`, `useClipboard`, `useScrollLock`, `useGsapContext`, `useScrollReveal`.
- `src/components/ui/` — komponen primitif murni (domain-agnostic).
- `src/components/layout/` — `SkipLink`, `Container`, `Header`, `MobileNav`, `Footer`.
- `src/features/` — `projects/` (ACL mapper, service, fallback, hook, card) & `certificates/` (selectors, filter hook, list, row, dialog, cursor preview).
- `src/components/sections/` — seluruh section halaman + `gallery/` subcomponents.
- `src/app/` — `App.tsx`, `AppProviders.tsx`, `SmoothScrollProvider.tsx`.

## Perintah NPM & Environment Variables
- `npm run dev` — menjalankan dev server Vite
- `npm run build` — build produksi Vite ke `dist/`
- `npm run preview` — preview hasil build
- `npm run typecheck` — `tsc --noEmit`
- `npm run lint` — `eslint . --max-warnings 0`
- `npm run test` — `vitest run`
- `npm run assets` — menjalankan ulang seluruh script Python aset
- `npm run check` — typecheck + lint + test + build

Env vars (lihat `.env.example`): `VITE_CMS_PROJECT_ID`, `VITE_CMS_DATASET`, `VITE_CMS_API_VERSION`, `VITE_CMS_TOKEN`.
