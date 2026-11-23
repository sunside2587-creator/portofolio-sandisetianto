import projectAzryaBatik from '@/assets/images/project-azrya-batik.webp';
import projectIntegratif from '@/assets/images/project-integratif.webp';
import type { Project } from '@/types/project';

export const PINNED_PROJECTS: readonly Project[] = [
  {
    id: 'murojaah-juz-30-tif',
    slug: 'murojaah-juz-30-tif',
    title: "Muroja'ah Juz 30 — TIF UIN Suska Riau",
    category: 'Mobile App',
    year: 2026,
    summary:
      'Aplikasi mobile setoran dan pemantauan progres hafalan Juz 30 mahasiswa Teknik Informatika UIN Suska Riau untuk syarat Kerja Praktek & Seminar.',
    coverImage: {
      url: projectIntegratif,
      alt: "Tampilan aplikasi Muroja'ah Juz 30 TIF UIN Suska Riau",
      width: 632,
      height: 472,
    },
    tags: ['Flutter', 'Dart', 'Android', 'REST API'],
    liveUrl: 'https://play.google.com/store/apps/details?id=uinsuska.tif.dashboard.student',
    featured: true,
    order: 1,
  },
  {
    id: 'azrya-batik-ai',
    slug: 'azrya-batik-ai',
    title: 'Azrya Batik — AI POS, HPP & Analytics',
    category: 'Fullstack & AI',
    year: 2026,
    summary:
      'Sistem kasir, kalkulator HPP, OCR nota belanja, asisten finansial RAG (Gemini API, LangChain, ChromaDB), dan analitik prediksi Streamlit untuk UMKM Azrya Batik.',
    coverImage: {
      url: projectAzryaBatik,
      alt: 'Dashboard Laporan, Asisten AI Tanya Data Azrya, dan Ekspor Streamlit pada aplikasi Azrya Batik',
      width: 1280,
      height: 692,
    },
    tags: [
      'React (Vite)',
      'Tailwind CSS',
      'Node.js & Express',
      'PostgreSQL',
      'FastAPI',
      'Vision AI / OCR',
      'Gemini + LangChain',
      'ChromaDB',
      'Scikit-learn & Prophet',
      'Streamlit',
    ],
    featured: true,
    order: 2,
  },
  {
    id: 'sandi-portfolio',
    slug: 'sandi-portfolio',
    title: 'Personal Portfolio',
    category: 'Web App',
    year: 2026,
    summary:
      'Editorial Brutalist × Y2K single-page portfolio built with React 19, strict TypeScript, Tailwind CSS v4, GSAP, Lenis, and Motion.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP'],
    featured: true,
    order: 3,
  },
];

export const FALLBACK_PROJECTS: readonly Project[] = [...PINNED_PROJECTS];
