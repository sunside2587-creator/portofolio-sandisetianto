# Sandi Setianto — Personal Portfolio

Website portofolio interaktif bergaya **Editorial Brutalist × Y2K Accents** milik **Sandi Setianto** (*Fullstack Developer* — Mahasiswa Teknik Informatika UIN Sultan Syarif Kasim Riau, Pekanbaru).

- **Live Demo:** [portofolio-sandisetianto-3yb5.vercel.app](https://portofolio-sandisetianto-3yb5.vercel.app)

---

## Fitur Utama

- **Editorial Brutalist × Y2K Aesthetic:** Palet kontras tinggi (`#F4ECE3` Warm Paper, `#0E0E0E` Ink Black, `#C21415` Crimson Signal) dengan tipografi display `Anton`, body `Inter`, dan metadata `JetBrains Mono`.
- **3D S-Wave Warped Wordmark:** Animasi tipografi gelombang 3D per karakter 60fps berbasis `motion/react` (`useAnimationFrame`).
- **Interactive Tech Stack Deck:** Kartu tumpukan teknologi interaktif dengan *fan deck* di desktop dan *dial carousel* di perangkat mobile.
- **Hybrid Selected Work (Sanity CMS + Pinned Fallback):** Mengambil proyek secara dinamis dari Sanity Headless CMS melalui Anti-Corruption Layer (validasi DTO ketat tanpa `any`) dan menggabungkannya dengan proyek unggulan lokal.
- **Sertifikat & Pencapaian Interaktif:** Katalog 19 sertifikat & penghargaan dengan *Highlights Strip* (Top 3 penghargaan), filter kategori, *spring cursor preview* di desktop, dan modal pratinjau penuh + tautan verifikasi kredensial asli.
- **Smooth Scroll & Motion Accessibility:** Integrasi `Lenis` + `GSAP ScrollTrigger` yang otomatis menonaktifkan animasi berat ketika pengguna mengaktifkan `prefers-reduced-motion: reduce`.

---

## Proyek Unggulan (Selected Work)

1. **Muroja'ah Juz 30 — TIF UIN Suska Riau** (`Mobile App`)
   - Aplikasi mobile setoran dan pemantauan progres hafalan Juz 30 mahasiswa Teknik Informatika UIN Suska Riau untuk syarat Kerja Praktek & Seminar.
   - **Stack:** Flutter, Dart, Android, REST API
   - **Google Play Store:** [uinsuska.tif.dashboard.student](https://play.google.com/store/apps/details?id=uinsuska.tif.dashboard.student)

2. **Azrya Batik — AI POS, HPP & Analytics** (`Fullstack & AI`)
   - Sistem kasir, kalkulator HPP, OCR nota belanja, asisten finansial RAG (*Tanya Data Azrya*), dan analitik prediksi penjualan untuk UMKM Azrya Batik.
   - **Front-End:** React.js (Vite), Tailwind CSS, Axios
   - **Back-End:** Node.js, Express REST API (`/api/v1/`), Joi, PostgreSQL
   - **AI Service:** Python, FastAPI, Vision AI / OCR, Gemini API + LangChain, ChromaDB
   - **Data Science:** Python, Pandas, Scikit-learn, Prophet, Streamlit

3. **Personal Portfolio** (`Web App`)
   - Portofolio single-page dengan arsitektur modular TypeScript ketat, animasi GSAP/Motion, dan integrasi Sanity CMS.
   - **Stack:** React 19, TypeScript, Tailwind CSS v4, GSAP, Lenis, Motion

---

## Tech Stack

| Kategori | Teknologi |
|---|---|
| **Core Framework** | React 19, Vite 8, TypeScript 5.8 (`strict`) |
| **Styling & Typography** | Tailwind CSS v4, `@fontsource` (Anton, Inter, JetBrains Mono) |
| **Animation & Scroll** | GSAP 3 + ScrollTrigger, Lenis Smooth Scroll, Motion (`motion/react`) |
| **Headless CMS** | Sanity Studio v3 + Sanity HTTP GROQ API |
| **Testing & Quality** | Vitest, ESLint 9 Flat Config (`--max-warnings 0`), TypeScript Strict Mode |
| **Asset Pipeline** | Python (`Pillow`, `PyMuPDF`) untuk konversi otomatis WebP responsif |

---

## Struktur Direktori

```text
├── asset/                  # Aset sumber mentah (foto, screenshot proyek, PDF/JPG sertifikat)
├── public/                 # Aset publik statis (favicon, robots.txt, og-image.png, PDF sertifikat)
├── scripts/                # Pipeline Python optimasi foto & sertifikat + runner Sanity Studio
├── src/
│   ├── app/                # Root App & AppProviders (SmoothScrollProvider)
│   ├── assets/             # Hasil optimasi WebP & manifest.json sertifikat
│   ├── components/
│   │   ├── layout/         # Header, MobileNav, Footer, Container, SkipLink
│   │   ├── sections/       # Hero, About, Gallery, SelectedWork, Services, Certificates, ContactCta
│   │   └── ui/             # Primitif UI (Button, Dialog, WarpedWordmark, FilterTabs, Marquee, dll.)
│   ├── content/            # Data statis terketik (profile, certificates, gallery, services, navigation)
│   ├── features/
│   │   ├── certificates/   # Selector, hook filter, cursor preview, komponen daftar & dialog sertifikat
│   │   └── projects/       # Mapper DTO Sanity, fallback data, service fetch, hook useProjects, ProjectCard
│   ├── hooks/              # Custom hooks (useMediaQuery, usePrefersReducedMotion, useGsapContext, dll.)
│   ├── lib/                # Utilitas murni (env, cms-client, gsap, formatters, dicoding)
│   ├── styles/             # Tailwind CSS v4 & custom design tokens (globals.css)
│   └── types/              # Definisi tipe TypeScript (project, certificate, cms, content)
└── studio/                 # Sanity Studio v3 untuk pengelolaan konten proyek
```

---

## Menjalankan Proyek Secara Lokal

### 1. Instalasi & Development Server

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

### 2. Daftar Perintah (`npm scripts`)

| Perintah | Kegunaan |
|---|---|
| `npm run dev` | Menjalankan development server Vite |
| `npm run build` | Build produksi ke folder `dist/` |
| `npm run preview` | Menjalankan preview hasil build produksi |
| `npm run typecheck` | Pemeriksaan tipe TypeScript (`tsc --noEmit`) |
| `npm run lint` | Pemeriksaan kode dengan ESLint (`--max-warnings 0`) |
| `npm run test` | Menjalankan unit test dengan Vitest |
| `npm run check` | Menjalankan `typecheck && lint && test && build` sekaligus |
| `npm run assets` | Menjalankan script Python untuk optimasi ulang foto, sertifikat, dan OG image |
| `npm run studio:install` | Menginstal dependensi Sanity Studio di folder `studio/` |
| `npm run studio` | Menjalankan Sanity Studio lokal di `http://localhost:3333` |

---

## Konfigurasi Sanity CMS & Deployment (Vercel)

1. Salin `.env.example` menjadi `.env` lalu isi konfigurasi Sanity:

```env
VITE_CMS_PROJECT_ID=your_project_id
VITE_CMS_DATASET=production
VITE_CMS_API_VERSION=2025-02-19
VITE_CMS_TOKEN=
```

2. Saat men-deploy ke **Vercel**, tambahkan domain Vercel Anda (misalnya `https://portofolio-sandisetianto-3yb5.vercel.app`) pada dashboard [Sanity Manage](https://www.sanity.io/manage) → **API** → **CORS Origins** (tanpa mencentang *Allow credentials*).
3. Jika `VITE_CMS_PROJECT_ID` tidak diisi atau koneksi CMS terputus, situs tetap berjalan normal menggunakan data proyek dari `src/features/projects/projects.fallback.ts`.

---

## Kontak

- **Nama:** Sandi Setianto
- **Email:** [sunside2587@gmail.com](mailto:sunside2587@gmail.com)
- **LinkedIn:** [linkedin.com/in/sandi-setianto-124686364](https://www.linkedin.com/in/sandi-setianto-124686364)
- **GitHub:** [@sunside2587](https://github.com/sunside2587) · [@sunside2587-creator](https://github.com/sunside2587-creator)
- **Instagram:** [@sandi.setianto](https://www.instagram.com/sandi.setianto)
