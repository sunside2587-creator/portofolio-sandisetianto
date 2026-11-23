import { getCertificateImage } from '@/lib/certificate-images';
import { createDicodingCertificate } from '@/lib/dicoding';
import type { Certificate } from '@/types/certificate';

const SIC_IOT_IMAGE = getCertificateImage(
  'sic7-iot',
  'Samsung Innovation Campus Batch 7 Stage 2 IoT Certificate',
);
const SIC_PYTHON_IMAGE = getCertificateImage(
  'sic7-python',
  'Samsung Innovation Campus Batch 7 Stage 1 Python Certificate',
);
const CLOUDCAMP_IMAGE = getCertificateImage(
  'cloudcamp-pekanbaru-2026',
  'Cloud Camp Pekanbaru 2026 Hackathon Web Innovation Certificate',
);
const ASOMATIF_IMAGE = getCertificateImage(
  'panitia-asomatif-2025',
  'Panitia ASOMATIF 2025 Committee Certificate',
);
const IOT_AWARD_IMAGE = getCertificateImage(
  'iot-simulation-terbaik',
  'IoT Simulation Terbaik Ramadhan Upgrade 2026 Certificate',
);
const PHOTOGRAPHY_AWARD_IMAGE = getCertificateImage(
  'juara-2-fotografi',
  'Juara II Lomba Fotografi se-PTKI Award Certificate',
);
const MFD_AWARD_IMAGE = getCertificateImage(
  'mfd-terbaik-3',
  'Terbaik III Musabaqah Fahmiddurus 2018 Certificate',
);

export const CERTIFICATES: readonly Certificate[] = [
  // Courses — Dicoding (11)
  createDicodingCertificate({
    slug: 'dicoding-backend-js',
    title: 'Belajar Back-End Pemula dengan JavaScript',
    issuedAt: '2026-11-08',
    credentialId: 'EYX4OG1EJXDL',
    featured: true,
    skills: ['JavaScript', 'Node.js', 'REST API'],
  }),
  createDicodingCertificate({
    slug: 'dicoding-react-fundamental',
    title: 'Belajar Fundamental Aplikasi Web dengan React',
    issuedAt: '2026-10-04',
    credentialId: 'N9ZO0M5O8XG5',
    featured: true,
    skills: ['React', 'JavaScript'],
  }),
  createDicodingCertificate({
    slug: 'dicoding-frontend-pemula',
    title: 'Belajar Membuat Front-End Web untuk Pemula',
    issuedAt: '2026-09-12',
    credentialId: 'EYX4O61GWXDL',
    featured: true,
    skills: ['HTML', 'CSS', 'JavaScript'],
  }),
  createDicodingCertificate({
    slug: 'dicoding-web-dasar',
    title: 'Belajar Dasar Pemrograman Web',
    issuedAt: '2026-09-04',
    credentialId: '1RXYDM573XVM',
    skills: ['HTML', 'CSS'],
  }),
  createDicodingCertificate({
    slug: 'dicoding-ai-dasar',
    title: 'Belajar Dasar AI',
    issuedAt: '2026-08-25',
    credentialId: 'JMZVL2VLOXN9',
    skills: ['AI'],
  }),
  createDicodingCertificate({
    slug: 'dicoding-git-github',
    title: 'Belajar Dasar Git dengan GitHub',
    issuedAt: '2026-08-20',
    credentialId: '4EXGJY4YEXRL',
    skills: ['Git', 'GitHub'],
  }),
  createDicodingCertificate({
    slug: 'dicoding-memulai-pemrograman',
    title: 'Memulai Dasar Pemrograman untuk Menjadi Pengembang Software',
    issuedAt: '2026-08-14',
    credentialId: '07Z6QKQYMZQR',
    skills: ['Programming'],
  }),
  createDicodingCertificate({
    slug: 'dicoding-logika-pemrograman',
    title: 'Pengenalan ke Logika Pemrograman (Programming Logic 101)',
    issuedAt: '2026-08-14',
    credentialId: '1OP87YVR8ZQK',
    skills: ['Logic'],
  }),
  createDicodingCertificate({
    slug: 'dicoding-spec-driven-kiro',
    title: 'Spec-Driven Development dengan Kiro',
    issuedAt: '2026-08-13',
    credentialId: '53XEML1D0PRN',
    skills: ['Spec-Driven', 'AI'],
  }),
  createDicodingCertificate({
    slug: 'dicoding-react-app',
    title: 'Belajar Membuat Aplikasi Web dengan React',
    issuedAt: '2026-08-09',
    credentialId: 'MRZMV5DLLZYQ',
    featured: true,
    skills: ['React', 'JavaScript'],
  }),
  createDicodingCertificate({
    slug: 'dicoding-javascript-dasar',
    title: 'Belajar Dasar Pemrograman JavaScript',
    issuedAt: '2026-08-02',
    credentialId: 'N9ZONGN0YXG5',
    skills: ['JavaScript'],
  }),

  // Programs (3)
  {
    id: 'sic7-iot',
    title: 'Samsung Innovation Campus Batch 7 — Stage 2: IoT (Device & Hardware Discovery)',
    issuer: 'Samsung Innovation Campus × ibimbing',
    category: 'program',
    issuedAt: '2025-12-05',
    credentialId: '353/SEIN-CC-SIC7/IoT/Mahasiswa/2025-2026',
    rank: 'BATCH 7',
    featured: true,
    skills: ['IoT', 'Hardware'],
    ...(SIC_IOT_IMAGE ? { image: SIC_IOT_IMAGE } : {}),
  },
  {
    id: 'sic7-python',
    title: 'Samsung Innovation Campus Batch 7 — Stage 1: Code Kickstart (Python Programming)',
    issuer: 'Samsung Innovation Campus × ibimbing',
    category: 'program',
    issuedAt: '2025-10-21',
    credentialId: '0353/SEIN-CC-SIC7/CP/Mahasiswa/2025-2026',
    skills: ['Python'],
    ...(SIC_PYTHON_IMAGE ? { image: SIC_PYTHON_IMAGE } : {}),
  },
  {
    id: 'asah-dicoding',
    title: 'Asah led by Dicoding — Mandatory Achievement #2',
    issuer: 'Dicoding × GoTo',
    category: 'program',
    issuedAt: '2026',
    skills: ['Bootcamp'],
  },

  // Events (2)
  {
    id: 'cloudcamp-pekanbaru-2026',
    title: 'Cloud Camp Pekanbaru 2026 — Hackathon Web Innovation (Juara III)',
    issuer: 'IDCloudHost',
    category: 'event',
    issuedAt: '2026-03-07',
    rank: 'JUARA III',
    featured: true,
    featuredHighlight: true,
    skills: ['Hackathon', 'Web'],
    ...(CLOUDCAMP_IMAGE ? { image: CLOUDCAMP_IMAGE } : {}),
  },
  {
    id: 'panitia-asomatif-2025',
    title: 'Panitia ASOMATIF 2025',
    issuer: 'HIMATIF UIN Suska Riau',
    category: 'event',
    issuedAt: '2025-10-16',
    skills: ['Committee'],
    ...(ASOMATIF_IMAGE ? { image: ASOMATIF_IMAGE } : {}),
  },

  // Awards (3)
  {
    id: 'iot-simulation-terbaik',
    title: 'Ramadhan Upgrade 2026 — IoT Simulation Terbaik',
    issuer: 'HIMATIF UIN Suska Riau',
    category: 'award',
    issuedAt: '2026',
    rank: 'TERBAIK',
    featured: true,
    featuredHighlight: true,
    skills: ['IoT'],
    ...(IOT_AWARD_IMAGE ? { image: IOT_AWARD_IMAGE } : {}),
  },
  {
    id: 'juara-2-fotografi',
    title: 'Gelar Lomba Pengembangan Potensi & Kreativitas Mahasiswa Nasional se-PTKI — Fotografi',
    issuer: 'Gerakan Pramuka Gudep Kota Pekanbaru 14-001/14-002 UIN Suska Riau',
    category: 'award',
    issuedAt: null, // [ISI] Tahun lomba fotografi belum tertera di sertifikat
    rank: 'JUARA II',
    featured: true,
    featuredHighlight: true,
    skills: ['Photography'],
    ...(PHOTOGRAPHY_AWARD_IMAGE ? { image: PHOTOGRAPHY_AWARD_IMAGE } : {}),
  },
  {
    id: 'mfd-terbaik-3',
    title: 'Musabaqah Fahmiddurus (MFD)',
    issuer: 'Pondok Modern Al-Kautsar',
    category: 'award',
    issuedAt: '2018',
    rank: 'TERBAIK III',
    ...(MFD_AWARD_IMAGE ? { image: MFD_AWARD_IMAGE } : {}),
  },
];
