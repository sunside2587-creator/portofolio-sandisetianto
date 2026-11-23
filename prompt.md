# KONTEKS
Saya Sandi Setianto, mahasiswa Teknik Informatika UIN Sultan Syarif Kasim Riau, Pekanbaru, dan [ISI: role, mis. "Frontend Developer"].
Saya ingin membangun website portofolio pribadi untuk dilihat rekruter dan klien.
Workspace: `c:\Users\Martrio\Documents\portofolio-sandisetianto`

Kondisi repo saat ini (sudah saya cek, verifikasi ulang):
- BELUM ADA `package.json`, artinya proyek masih kosong dan perlu di-scaffold.
- Sudah ada: `.agents/skills/` (aturan coding), `.claude/skills/motion/` + `.claude/agents/motion-reviewer.md` (aturan animasi), `.mcp.json` (Motion MCP), `design/` (referensi visual), `asset/` (foto saya), `asset/SERTIFIKAT/` (20 file sertifikat berformat PDF/JPEG/PNG).
- Headless CMS BELUM disiapkan.

# PERAN
Bekerjalah sebagai satu tim yang terdiri dari:
1. **Senior UI/UX Designer**: menerjemahkan referensi visual ke design system yang konsisten, aksesibel, dan responsif.
2. **System Analyst**: merancang struktur folder, arsitektur komponen, dan alur data yang scalable.
3. **Senior Frontend Engineer**: menulis kode produksi yang type-safe, bersih, dan performan.
Jika ketiga peran bertentangan, prioritasnya: **keterbacaan & aksesibilitas > fidelity terhadap desain > efek visual**.

# LANGKAH WAJIB SEBELUM NGODING (Pre-Flight)
Kerjakan berurutan dan laporkan temuan singkat untuk tiap poin:
1. Baca semua `SKILL.md` (dan `AGENTS.md` bila ada) di `.agents/skills/` serta `.claude/skills/motion/`. Patuhi aturannya, terutama `karpathy-guidelines`, `vercel-react-best-practices`, `vercel-composition-patterns`, `typescript-advanced-types`, `uxui-principles`, dan best-practices Motion.
2. Cek `package.json`. Kalau tidak ada, **usulkan** perintah scaffold beserta daftar dependensinya dan TUNGGU persetujuan saya sebelum menginstal apa pun.
3. Analisis kedua gambar di `design/` dan tuliskan ulang design token yang kamu tangkap (warna hex, font, skala tipografi, grid, spacing). Bandingkan dengan spesifikasi di bawah dan sebutkan perbedaannya.
4. Inspeksi semua foto di `asset/`, lalu konfirmasi atau koreksi mapping foto yang saya usulkan di bawah.
5. Cocokkan isi `asset/SERTIFIKAT/` dengan **Inventaris Sertifikat** di bawah. Laporkan kalau ada file baru, file yang hilang, atau data yang tidak cocok.

# TECH STACK (usulan, minta persetujuan sebelum install)
- Vite + React 19 + TypeScript (strict mode)
- Tailwind CSS v4 (token didefinisikan via `@theme`)
- GSAP + ScrollTrigger: animasi yang terikat scroll (pin, scrub, reveal headline)
- Lenis: smooth scroll
- Motion (`motion/react`): micro-interaction komponen (hover, tap, layout, presence)
- Headless CMS: [ISI: Sanity / Contentful / Strapi / belum tahu]. Kalau "belum tahu", rekomendasikan 1 opsi beserta alasan singkat.
- Font via `@fontsource` (self-hosted, tanpa CDN)
- Untuk thumbnail sertifikat: script Python satu kali pakai dengan **PyMuPDF** (sudah terinstal di mesin saya), jadi tidak perlu dependensi npm baru.

# ARAH DESAIN: "Editorial Brutalist × Y2K Accents"
Catatan: referensi di `design/` lebih dekat ke gaya **editorial / Swiss brutalist** (merah-hitam-krem, tipografi condensed raksasa) daripada Y2K klasik. Jadi kerangka utamanya editorial, lalu aksen Y2K dipakai secukupnya sebagai bumbu. JANGAN pakai chrome gradient, glossy bubble, atau warna neon/pastel yang tidak ada di referensi.

## Referensi
- `design/design_web2.jpg` = **acuan utama layout & struktur section**.
- `design/design_web.png` = **acuan aksen Y2K & interaksi**: wordmark outline yang terdistorsi/warp, blok merah vertikal di belakang teks, marker crosshair `+` di sudut grid, panah segitiga di sisi layar, kartu-kartu bersudut membulat yang tersusun mengipas (fan/arc), dan teks melingkar berputar ("PORTFOLIO • PORTFOLIO •").

## Design Tokens (verifikasi dengan color picker dari gambar, lalu sesuaikan)
| Token | Nilai awal | Pemakaian |
|---|---|---|
| `--color-paper` | `#F1ECE4` | background utama (krem) |
| `--color-ink` | `#111111` | teks utama, section gelap, footer |
| `--color-signal` | `#D7261E` | aksen merah: blok, angka statistik, garis aksen, CTA |
| `--color-muted` | `#6B6B6B` | label / meta |
| `--color-line` | `#11111126` | divider grid 1px |

- **Display font**: sans ultra-condensed tebal, uppercase (mis. *Anton*, *Bebas Neue*, atau *Big Shoulders Display*). Headline hero memakai `clamp()` dan bisa mencapai ±18vw di desktop, dengan line-height 0.85.
- **Body/label font**: grotesk bersih (mis. *Inter* atau *Space Grotesk*). Label meta uppercase, ±11–12px, tracking lebar.
- **Grid**: 12 kolom, divider 1px tipis antar-section dan antar-kolom (seperti referensi), marker `+` di titik potong grid.
- **Detail berulang**: garis merah pendek (±32px) di atas label section, link teks bergaya "LABEL ⟶", badge lingkaran berisi teks melingkar yang berputar pelan.
- Kontras teks wajib lolos WCAG AA. Merah di atas krem hanya untuk teks besar/display.

## Daftar Section (urutan dan isi)
1. **Top Meta Bar**: kiri role, tengah "BASED IN PEKANBARU, INDONESIA", kanan "AVAILABLE FOR PROJECTS" + monogram "SS" dalam lingkaran. Di mobile berubah jadi menu ringkas. Anchor nav: Work, Certificates, Contact.
2. **Hero**: headline condensed 2–3 baris dengan dua warna (hitam + merah), copy: [ISI: tagline]. Foto berdiri di atas blok merah vertikal. Ada paragraf pendek di kanan, "⟶ SCROLL TO EXPLORE" di kiri bawah, dan aksen Y2K berupa marker `+` serta wordmark outline yang tipis/terdistorsi di layer belakang.
3. **About Me**: split 2 kolom. Kiri: label "ABOUT ME", headline condensed dengan satu kata digarisbawahi merah, paragraf, lalu "MORE ABOUT ME ⟶". Kanan: grid 4 statistik dengan angka merah besar yang count-up saat masuk viewport, plus badge teks melingkar. **Angka statistik "Sertifikat" dan "Penghargaan" dihitung otomatis dari data sertifikat** (`certificates.length` dan jumlah item kategori `award`), bukan di-hardcode.
4. **Me / Gallery (aksen dari referensi 1)**: kartu-kartu bersudut membulat tersusun mengipas di atas busur, dengan foto saya di kartu tengah dan thumbnail proyek di kiri-kanan. Ada teks melingkar "PORTFOLIO •" di busur bawah dan label "▲ ME". Bisa di-drag/hover untuk memutar kipas. Di mobile berubah jadi carousel horizontal dengan scroll-snap.
5. **Selected Work (data dari CMS)**: kolom judul "SELECTED WORK" + deskripsi + "VIEW ALL WORK ⟶", lalu 3 kartu proyek bernomor `01 02 03` dengan background bergantian hitam / merah / krem. Isi kartu: judul, kategori, gambar, dan ikon `+`.
6. **What I Do**: 4 kolom layanan/skill, masing-masing dengan ikon geometris sederhana (lingkaran, kotak, dan sejenisnya, dibuat dengan SVG/CSS dan bukan library ikon), judul, deskripsi, dan "LEARN MORE ⟶".
7. **Certificates & Awards (BARU)**: detail lengkapnya ada di bagian khusus di bawah.
8. **Footer CTA (latar ink)**: "LET'S CREATE SOMETHING GREAT TOGETHER." dengan garis merah, tombol "GET IN TOUCH ⟶", kontak (email, telepon, lokasi), badge berputar "AVAILABLE FOR NEW PROJECTS", baris sosial (LinkedIn, GitHub, Instagram, Dribbble), dan copyright.

## Section 7: Certificates & Awards (spesifikasi)
Gaya tetap editorial brutalist dan konsisten dengan section lain, terdiri dari 3 bagian:

**a. Header**
Garis merah + label "CREDENTIALS". Judul condensed "CERTIFICATES & AWARDS" dengan angka total besar berwarna merah di sampingnya (mis. `19`, count-up). Di kanan ada paragraf singkat.

**b. Awards Strip (highlight)**
3 kartu penghargaan berukuran besar dan bernomor `01–03` dengan background bergantian ink / signal / paper (pola sama dengan Selected Work). Isi kartu: peringkat sebagai teks display ("JUARA II", "TERBAIK", "TERBAIK III"), nama kegiatan, penyelenggara, dan tahun. Klik kartu untuk membuka lightbox.

**c. Index List (semua kredensial)**
- Filter tab (pakai `button` + `aria-pressed`, bukan link): **All · Courses · Programs · Events · Awards**, masing-masing dengan jumlah item, mis. "COURSES (11)". Perpindahan filter dianimasikan dengan Motion `layout` + `AnimatePresence`.
- Layout berupa **tabel editorial**. Tiap baris berisi: nomor `01`, judul (condensed), penerbit, tanggal, dan aksi "VERIFY ⟶" (kalau ada URL verifikasi) atau "VIEW ⟶". Antarbaris dipisah divider 1px.
- Urutan default: tanggal terbaru → terlama, lalu baris yang `featured` dinaikkan ke atas.
- **Aksen Y2K:** di desktop dengan pointer halus (`(hover: hover) and (pointer: fine)`), saat baris di-hover muncul **thumbnail sertifikat yang mengikuti kursor** dengan sedikit rotasi dan sudut membulat seperti kartu referensi 1. Gunakan Motion `useSpring` dan hanya `transform`. Di mobile/touch fitur ini dimatikan, dan thumbnail kecil ditampilkan di dalam baris.
- Tampilkan 8 baris pertama, lalu tombol "SHOW ALL (19) ⟶" untuk membuka sisanya. Pakai progressive disclosure, bukan pagination.

**d. Lightbox / Detail Dialog**
- Pakai elemen `<dialog>` native atau komponen dialog yang aksesibel: focus trap, tutup dengan `Esc`, fokus kembali ke elemen pemicu, `aria-labelledby`, dan scroll body terkunci (pause Lenis saat dialog terbuka).
- Isi: gambar sertifikat resolusi penuh, judul, penerbit, tanggal terbit, "Berlaku hingga" (kalau ada), ID kredensial (dengan tombol copy), tombol "VERIFIKASI ⟶" (`target="_blank" rel="noopener noreferrer"`), dan "UNDUH PDF" (kalau file PDF tersedia).
- Navigasi prev/next dengan tombol dan tombol panah keyboard, sesuai filter yang sedang aktif.

## Inventaris Sertifikat (sumber kebenaran data, JANGAN dikarang ulang)
Data ini diekstrak langsung dari isi file. **19 kredensial unik dari 20 file.**

**Courses — Dicoding (11, semua punya URL verifikasi dan masa berlaku 3 tahun)**
| # | File | Judul | Tanggal | ID | Featured |
|---|---|---|---|---|---|
| 1 | `Belajar Back-End Pemula dengan JavaScript.pdf` | Belajar Back-End Pemula dengan JavaScript | 2026-11-08 | EYX4OG1EJXDL | ✅ |
| 2 | `Belajar Fundamental Aplikasi Web dengan React.pdf` | Belajar Fundamental Aplikasi Web dengan React | 2026-10-04 | N9ZO0M5O8XG5 | ✅ |
| 3 | `FRONTEND.pdf` | Belajar Membuat Front-End Web untuk Pemula | 2026-09-12 | EYX4O61GWXDL | ✅ |
| 4 | `belajarDasarPemrogramanWeb.pdf` | Belajar Dasar Pemrograman Web | 2026-09-04 | 1RXYDM573XVM | |
| 5 | `belajar-dasarAI.pdf` | Belajar Dasar AI | 2026-08-25 | JMZVL2VLOXN9 | |
| 6 | `sertifikat-git&github.pdf` | Belajar Dasar Git dengan GitHub | 2026-08-20 | 4EXGJY4YEXRL | |
| 7 | `sertifikat-memulaiDasarPemrograman.pdf` | Memulai Dasar Pemrograman untuk Menjadi Pengembang Software | 2026-08-14 | 07Z6QKQYMZQR | |
| 8 | `sertifikat-pengenalanLogikaPemrograman.pdf` | Pengenalan ke Logika Pemrograman (Programming Logic 101) | 2026-08-14 | 1OP87YVR8ZQK | |
| 9 | `sertifikat-spec-driven-development.pdf` | Spec-Driven Development dengan Kiro | 2026-08-13 | 53XEML1D0PRN | |
| 10 | `sertifikat_react.pdf` | Belajar Membuat Aplikasi Web dengan React | 2026-08-09 | MRZMV5DLLZYQ | ✅ |
| 11 | `sertifikat_javaScript_Dicoding.pdf` | Belajar Dasar Pemrograman JavaScript | 2026-08-02 | N9ZONGN0YXG5 | |

- URL verifikasi: `https://www.dicoding.com/certificates/{ID}`
- Masa berlaku: tanggal terbit + 3 tahun

**Programs (3)**
| File | Judul | Penerbit | Tanggal | No. |
|---|---|---|---|---|
| `s-phyton.png` | Samsung Innovation Campus Batch 7 — Stage 1: Code Kickstart (Python Programming) | Samsung Innovation Campus × ibimbing | 2025-10-21 | 0353/SEIN-CC-SIC7/CP/Mahasiswa/2025-2026 |
| `s-IoTsamsung.png` | Samsung Innovation Campus Batch 7 — Stage 2: IoT (Device & Hardware Discovery) | Samsung Innovation Campus × ibimbing | 2025-12-05 | 353/SEIN-CC-SIC7/IoT/Mahasiswa/2025-2026 |
| `Asah led by Dicoding/[Asah 2026] Hasil Mandatory Achievement #2 - FS220B6Y1626.pdf` | Asah led by Dicoding (supported by GoTo) — Lulus Mandatory Achievement #2 | Dicoding × GoTo | 2026 | — |

**Events (2)**
| File | Judul | Penerbit | Tanggal |
|---|---|---|---|
| `s-cloudcamp.png` | Cloud Camp Pekanbaru 2026 — Hackathon Web Innovation (Peserta) | IDCloudHost | 2026-03-07 |
| `s-asomatif2025.jpeg` | Panitia ASOMATIF 2025 | HIMATIF UIN Suska Riau | 2025-10-16 s.d. 19 |

**Awards (3)**
| File | Peringkat | Kegiatan | Penyelenggara | Tahun |
|---|---|---|---|---|
| `s-IoT2.jpeg` | IoT Simulation Terbaik | Ramadhan Upgrade 2026 | HIMATIF UIN Suska Riau | 2026 |
| `s-fotografi2.jpeg` | Juara II — Cabang Lomba Fotografi | Gelar Lomba Pengembangan Potensi & Kreativitas Mahasiswa Nasional se-PTKI | Gerakan Pramuka Gudep Kota Pekanbaru 14-001/14-002 UIN Suska Riau | [ISI: tahun] |
| `FMD.jpeg` | Terbaik III | Musabaqah Fahmiddurus (MFD) | Pondok Modern Al-Kautsar | 2018 |

**Catatan khusus (wajib ditangani):**
- **Duplikat:** `sertifikat fundamental dengan react.pdf` identik dengan `Belajar Fundamental Aplikasi Web dengan React.pdf` (hash sama). Pakai salah satu saja.
- **Asah:** file ini berupa *surat pemberitahuan* internal, bukan sertifikat, dan berisi nomor peserta serta link Google Docs internal. **Jangan publikasikan PDF-nya.** Cukup tampilkan sebagai entri teks tanpa tombol unduh, kecuali saya bilang lain.
- **Foto fisik:** `FMD.jpeg` terputar 90° dan masih ada latar kain. `s-fotografi2.jpeg` dan `s-IoT2.jpeg` adalah foto kertas dengan perspektif miring. Saat memproses, rotasi/crop seperlunya. Kalau hasilnya tetap kurang rapi, tandai di laporan supaya saya bisa memberi scan yang lebih baik.
- **Relevansi:** sertifikat MFD (2018, non-teknis) disarankan hanya muncul di filter "Awards", bukan di Awards Strip, kecuali saya minta.

## Pipeline Aset Sertifikat
1. Buat `scripts/build-certificates.py` (PyMuPDF + Pillow bila tersedia) yang:
   - me-render **halaman 1** setiap PDF ke gambar;
   - mengonversi semua sertifikat (PDF/JPEG/PNG) ke **WebP** dalam 2 ukuran: thumbnail 480px dan full 1600px;
   - menyimpan hasilnya ke `src/assets/certificates/` dengan nama file slug (mis. `dicoding-react-fundamental.webp`);
   - melewati file duplikat dan file Asah.
2. Salin PDF yang boleh diunduh ke `public/certificates/{slug}.pdf`.
3. Script bersifat idempoten dan bisa dijalankan ulang kalau saya menambah sertifikat baru. Dokumentasikan cara menjalankannya di README.
4. File asli di `asset/SERTIFIKAT/` TIDAK boleh diubah.

## Mapping Foto (`asset/`)
| File | Karakter | Usulan pemakaian |
|---|---|---|
| `DSC07495 (1).JPG` | frontal, low-key, jaket merah, latar hitam | **Hero** (crop portrait, ditempatkan di atas blok merah) **dan kartu tengah Gallery**. Paling cocok dengan palet merah-hitam. |
| `DSC07498 (1).JPG` | profil samping, moody | **About Me** |
| `foto_Sandi_RBG.png` | cutout transparan, tampak belakang | aksen dekoratif (mis. parallax di Footer CTA atau kartu Gallery). Jangan dipakai sebagai foto utama karena wajah tidak terlihat. |

Wajib dioptimasi: file JPG asli berukuran ±3.5MB, jadi resize dan konversi ke **AVIF/WebP** (lebar 640/1280/1920), sediakan `srcset`/`sizes`, `width`/`height` eksplisit, `alt` deskriptif, `fetchpriority="high"` untuk foto hero, dan `loading="lazy"` untuk sisanya. Pindahkan hasil optimasi ke `src/assets/images/` dan jangan ubah file asli di `asset/`.

# ARSITEKTUR
```
scripts/          build-certificates.py
public/certificates/   PDF yang boleh diunduh
src/
  app/            App.tsx, providers (SmoothScrollProvider)
  components/
    ui/           primitif: Button, ArrowLink, SectionLabel, RotatingBadge, CrosshairGrid, Marquee, Dialog, FilterTabs
    layout/       TopBar, Footer, Container
    sections/     Hero, About, Gallery, SelectedWork, Services, Certificates, ContactCTA
  features/
    projects/     ProjectCard, useProjects.ts, projects.service.ts, projects.fallback.ts
    certificates/ AwardCard, CertificateRow, CertificateList, CertificateDialog, CursorPreview,
                  useCertificateFilter.ts, certificates.selectors.ts (sort, count per kategori, featured)
  lib/            gsap.ts (register plugin sekali), lenis.ts, cms-client.ts
  hooks/          useReducedMotion, useMediaQuery, useCountUp
  content/        about, services, stats, socials, certificates.ts (data statis yang typed)
  assets/         images/, certificates/ (output script)
  types/          project.ts, certificate.ts, cms.ts
  styles/         globals.css (Tailwind @theme + tokens)
```
- Satu komponen = satu tanggung jawab. Usahakan file ≤150 baris, dan pecah kalau melebihi.
- Gunakan composition (children/compound component), bukan boolean props yang menumpuk.
- Teks konten tidak di-hardcode di JSX section. Ambil dari `content/` atau CMS.

## Tipe Data Sertifikat
```ts
type CertificateCategory = 'course' | 'program' | 'event' | 'award';

interface Certificate {
  id: string;            // slug unik
  title: string;
  issuer: string;
  category: CertificateCategory;
  issuedAt: string;      // ISO date (YYYY-MM-DD atau YYYY)
  expiresAt?: string;
  credentialId?: string;
  verifyUrl?: string;
  rank?: string;         // khusus award, mis. "Juara II"
  image: { thumb: string; full: string; alt: string; width: number; height: number };
  pdfUrl?: string;
  featured?: boolean;
  skills?: string[];     // mis. ['React', 'JavaScript'], ditampilkan sebagai tag
}
```
- Data sertifikat bersifat **statis** dan disimpan di `content/certificates.ts`, karena jarang berubah dan tidak perlu request jaringan. Meski begitu, pakai tipe yang sama dengan kontrak CMS supaya nanti bisa dipindah ke CMS tanpa mengubah komponen.
- `verifyUrl` dan `expiresAt` Dicoding diturunkan dari `credentialId` / `issuedAt` lewat helper. Jangan ditulis manual berulang-ulang.

# ATURAN ANIMASI (anti-bentrok)
- **Pembagian tugas tegas**: GSAP untuk scroll-driven (reveal headline per baris, parallax foto, pin Gallery, stagger reveal baris sertifikat), Motion untuk interaksi elemen (hover kartu, tombol, rotasi kipas, filter layout, cursor preview, dialog), CSS untuk loop sederhana (badge berputar, marquee). **Satu elemen tidak boleh dianimasikan oleh dua library sekaligus.**
- Lenis disinkronkan dengan GSAP: `lenis.on('scroll', ScrollTrigger.update)` dan `gsap.ticker.add(t => lenis.raf(t * 1000))`, plus `gsap.ticker.lagSmoothing(0)`. Hanya boleh ada satu instance Lenis. Panggil `lenis.stop()` saat dialog terbuka dan `lenis.start()` saat ditutup.
- Setelah filter sertifikat berubah atau "Show all" dibuka, panggil `ScrollTrigger.refresh()` karena tinggi halaman ikut berubah.
- Semua animasi GSAP dibungkus `gsap.context()` / `useGSAP` dengan cleanup saat unmount.
- Animasikan hanya `transform` dan `opacity`. Hindari animasi `width`/`height`/`top`/`left`/`filter: blur` berukuran besar.
- `prefers-reduced-motion`: matikan Lenis, parallax, rotasi, dan cursor preview, lalu ganti reveal dengan fade sederhana.
- Target 60fps di laptop mid-range, dan tidak ada layout shift (CLS < 0.1).

# INTEGRASI HEADLESS CMS
- Kontrak tipe `Project`: `id, slug, title, category, year, summary, coverImage {url, alt, width, height}, tags[], liveUrl?, repoUrl?, featured, order`.
- `projects.service.ts` → fetch + mapping respons CMS ke `Project` (validasi runtime dengan type guard; kalau `zod` mau dipakai, minta izin dulu).
- `useProjects()` → mengembalikan `{ data, status: 'idle'|'loading'|'success'|'error', error, refetch }`.
- Env: `VITE_CMS_PROJECT_ID`, `VITE_CMS_DATASET`, `VITE_CMS_TOKEN` (sesuaikan dengan CMS yang dipilih). Buat `.env.example`, pastikan `.env` masuk `.gitignore`, dan token yang terekspos ke client hanya token read-only/public.
- Kalau env kosong atau request gagal, pakai `projects.fallback.ts` (3 proyek dummy realistis) dan tampilkan indikator kecil "demo data" hanya di mode development.
- UI state: skeleton kartu dengan bentuk yang sama seperti kartu asli (bukan spinner), error state dengan tombol "Coba lagi", dan empty state.
- (Opsional, nanti) Sertifikat bisa dipindah ke CMS dengan tipe `Certificate` yang sama.

# ACCEPTANCE CRITERIA (Definition of Done)
- [ ] `npm run build` dan `tsc --noEmit` lolos tanpa error, tanpa `any`, dan ESLint bersih.
- [ ] Tampilan rapi di 375px, 768px, 1024px, 1440px, dan 1920px. Tidak ada horizontal scroll.
- [ ] Lighthouse (mobile): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- [ ] Bisa dinavigasi penuh dengan keyboard, focus ring terlihat, semantic landmarks (`header/main/section/footer`), dan heading berurutan.
- [ ] Meta SEO + Open Graph + favicon monogram "SS".
- [ ] Mode reduced-motion berfungsi.
- [ ] Situs tetap tampil lengkap tanpa koneksi CMS (fallback).
- [ ] **Sertifikat:** 19 entri tampil sesuai inventaris, tanpa duplikat. Filter dan jumlah per kategori benar. Semua link verifikasi Dicoding valid. Dialog lolos uji keyboard (Tab, Esc, panah). Thumbnail di-lazy-load. Total berat thumbnail section ≤ 600KB.

# BATASAN
- Jangan instal paket di luar daftar yang sudah disetujui.
- Jangan mengarang data pribadi saya (pengalaman, klien, angka statistik). Data sertifikat hanya boleh diambil dari Inventaris di atas. Data lain pakai placeholder yang jelas seperti `[TAHUN_PENGALAMAN]` dan kumpulkan semuanya di `content/` supaya mudah saya isi.
- Jangan ubah/hapus file di `design/`, `asset/` (termasuk `asset/SERTIFIKAT/`), `.agents/`, dan `.claude/`.
- Jangan publikasikan dokumen yang berisi data internal (surat Asah).
- Kalau ada asumsi, tulis eksplisit. Kalau ragu, tanya, jangan menebak.

# ALUR KERJA (berhenti di setiap ✋ checkpoint)
**Fase 0: Rencana** ✋
Kirim ringkasan yang berisi: hasil pre-flight, design token final, mapping foto, hasil cek inventaris sertifikat, struktur folder, daftar dependensi + perintah install, rekomendasi CMS, dan daftar pertanyaan/placeholder. Belum ada kode di fase ini. Tunggu persetujuan saya.

**Fase 1: Fondasi** ✋ scaffold, Tailwind tokens, font, optimasi foto, **script `build-certificates.py` + `content/certificates.ts`**, layout (TopBar, Container, Footer), dan primitif UI (termasuk Dialog & FilterTabs).
**Fase 2: Section statis** ✋ Hero → About → Gallery → Selected Work (pakai fallback) → What I Do → **Certificates & Awards** → Footer CTA, semuanya responsif dan belum dianimasikan.
**Fase 3: Animasi** ✋ Lenis + GSAP + Motion sesuai aturan di atas, termasuk cursor preview sertifikat dan reduced-motion.
**Fase 4: CMS** ✋ client, service, hook, env, dan state UI.
**Fase 5: QA** build, typecheck, cek responsif, Lighthouse, cek semua link verifikasi, lalu laporan akhir yang berisi apa yang selesai, apa yang masih placeholder, dan langkah berikutnya.

Di akhir setiap fase, laporkan: file yang dibuat/diubah, cara menjalankan/memverifikasi, dan keputusan yang perlu saya ambil.