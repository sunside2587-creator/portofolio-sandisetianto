# PROGRESS

## Status Terakhir
**Fase 1–5 selesai + Sanity Studio (`studio/`) Siap Pakai.** Folder `studio/` lengkap dengan schema `project` (`studio/schemaTypes/project.ts`), file `.env` root, dan script sinkronisasi `npm run studio` (`scripts/run-studio.mjs`) telah dibuat. Tinggal memasukkan `VITE_CMS_PROJECT_ID` ke `.env`.

Catatan QA Browser: server preview sempat dijalankan di `http://localhost:4173/`, namun browser subagent tidak dapat terhubung ke Chrome DevTools karena remote debugging Chrome (`DevToolsActivePort`) belum diaktifkan di mesin pengguna. Pengujian visual, responsif, dan Lighthouse mobile perlu dijalankan manual saat membuka situs di browser.

## Langkah Berikutnya
1. Isi sisa placeholder `[ISI]` bila sudah tersedia (`contact.cvUrl`, `juara-2-fotografi.issuedAt`, `yearsCodingPlaceholder`, `VITE_CMS_PROJECT_ID`, dan proyek nyata di Sanity CMS).
2. Jalankan `npm run dev` untuk melihat situs secara langsung dan lakukan audit Lighthouse mobile di Chrome DevTools.

## Checklist
- [x] **Fase 0 — Pre-Flight & Perencanaan**
  - [x] Membaca `prompt.md`, `PRD_PORTOFOLIOSANDI.md`, `.agents/skills/`, `.claude/skills/motion/`
  - [x] Sampling warna referensi di `design/` dan inspeksi foto di `asset/` serta `asset/SERTIFIKAT/`
  - [x] Konfirmasi pilihan stack, role, tagline, dan CMS dengan pemilik

- [x] **Fase 1 — Fondasi & Data**
  - [x] Buat `CONTEXT.md` dan `PROGRESS.md`
  - [x] Scaffold `package.json`, `tsconfig.json`, `vite.config.ts`, `eslint.config.js`, `.gitignore`, `.env.example`, `index.html`, `public/`
  - [x] Install dependensi React 19, Vite, Tailwind v4, GSAP, Lenis, Motion, fonts, ESLint, Vitest
  - [x] Pipeline aset Python (`optimize-photos.py`, `build-certificates.py`, `make-og-image.py`) & verifikasi visual crop/rotasi
  - [x] Implementasi `src/types/`, `src/lib/`, `src/content/`, `src/features/*` pure logic + unit tests
  - [x] Verifikasi `typecheck`, `lint`, dan `test` lolos

- [x] **Fase 2 — Layout & Section Statis**
  - [x] Setup `src/styles/globals.css`, `src/main.tsx`, `src/app/AppProviders.tsx`, `src/app/App.tsx`
  - [x] Implementasi primitif `src/components/ui/`, `src/hooks/`, dan `src/components/layout/`
  - [x] Implementasi seluruh section (`Hero`, `Marquee`, `About`, `Gallery`, `SelectedWork`, `Services`, `Certificates`, `ContactCta`) + Dialog & Filter
  - [x] Verifikasi `npm run check` lolos

- [x] **Fase 3 — Animasi & Interaksi**
  - [x] Integrasi `SmoothScrollProvider` (Lenis + GSAP ticker) dengan guard `prefers-reduced-motion`
  - [x] Hook `useGsapContext` & `useScrollReveal`, hero line reveal, dan parallax
  - [x] `CursorPreview` berbasis `useMotionValue` + `useSpring` & `ScrollTrigger.refresh()` saat list berubah
  - [x] Verifikasi `npm run check` lolos

- [x] **Fase 4 — CMS & Dokumentasi**
  - [x] Verifikasi end-to-end `env.ts` → `cms-client.ts` → `projects.service.ts` → `useProjects.ts` + fallback
  - [x] Tulis `README.md` (setup, skema Sanity, pipeline sertifikat, check)
  - [x] Verifikasi `npm run check` lolos

- [x] **Fase 5 — QA & Laporan Akhir**
  - [x] Cek bundle size (≤ 200 KB gzip), larangan `console.log` & unsafe `any`/`as`, serta batas ≤ 150 baris komponen `.tsx`
  - [x] Menyiapkan preview & delegasi QA browser (terkendala `DevToolsActivePort` Chrome belum aktif — didokumentasikan untuk dicek manual)
  - [x] Update akhir `PROGRESS.md` & `CONTEXT.md`

## Placeholder `[ISI]` Milik Pemilik
- [x] Email kontak aktif (`src/content/profile.ts` → `contact.email`: `sunside2587@gmail.com`)
- [x] Tautan LinkedIn (`src/content/profile.ts` → `contact.linkedin`: `https://www.linkedin.com/in/sandi-setianto-124686364`)
- [x] Tautan GitHub (`src/content/profile.ts` → `contact.github`: `https://github.com/sunside2587`, `githubSecondary`: `https://github.com/sunside2587-creator`)
- [x] Tautan Instagram (`src/content/profile.ts` → `contact.instagram`: `https://www.instagram.com/sandi.setianto`)
- [ ] File CV PDF (`src/content/profile.ts` → `contact.cvUrl`)
- [ ] Tahun lomba fotografi se-PTKI (`src/content/certificates.ts` → `juara-2-fotografi.issuedAt`)
- [ ] Tahun belajar/pengalaman untuk statistik About (`src/content/profile.ts`)
- [ ] Sanity Project ID di `.env` (`VITE_CMS_PROJECT_ID`)
- [ ] Data proyek nyata di Sanity CMS atau `src/features/projects/projects.fallback.ts`
