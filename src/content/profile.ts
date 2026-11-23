export interface TaglineLine {
  readonly text: string;
  readonly tone: 'ink' | 'signal';
}

export interface ContactInfo {
  readonly email: string | null;
  readonly linkedin: string | null;
  readonly github: string | null;
  readonly githubSecondary?: string | null;
  readonly instagram: string | null;
  readonly cvUrl: string | null; // [ISI]
}

export interface ProfileData {
  readonly name: string;
  readonly monogram: string;
  readonly role: string;
  readonly location: string;
  readonly availability: string;
  readonly taglineLines: readonly TaglineLine[];
  readonly heroIntro: string;
  readonly aboutLabel: string;
  readonly aboutHeadlinePrefix: string;
  readonly aboutHeadlineEmphasis: string;
  readonly bioShort: string;
  readonly bioLong: string;
  readonly yearsCodingPlaceholder: number | null;
  readonly contact: ContactInfo;
}

export const PROFILE: ProfileData = {
  name: 'Sandi Setianto',
  monogram: 'SS',
  role: 'Fullstack Developer',
  location: 'Pekanbaru, Indonesia',
  availability: 'Open to internship & freelance',
  taglineLines: [
    { text: 'CODE', tone: 'ink' },
    { text: 'THAT', tone: 'signal' },
    { text: 'CONNECTS', tone: 'signal' },
  ] satisfies readonly TaglineLine[],
  heroIntro:
    'I build fast, accessible web products — from interface to API — with care for every detail.',
  aboutLabel: 'ABOUT ME',
  aboutHeadlinePrefix: 'AN INFORMATICS STUDENT WHO LOVES CLEAN ARCHITECTURE AND ',
  aboutHeadlineEmphasis: 'BOLD IDEAS.',
  bioShort:
    'I am an Informatics Engineering student at UIN Sultan Syarif Kasim Riau in Pekanbaru, focusing on modern fullstack web development with React, TypeScript, and JavaScript.',
  bioLong:
    'My foundation spans front-end interfaces with React, back-end fundamentals with Node.js and REST APIs, and hardware-connected prototyping through Samsung Innovation Campus (Python & IoT) as well as hackathon collaboration at Cloud Camp Pekanbaru.',
  yearsCodingPlaceholder: null, // [ISI] Tahun belajar/pengalaman
  contact: {
    email: 'sunside2587@gmail.com',
    linkedin: 'https://www.linkedin.com/in/sandi-setianto-124686364',
    github: 'https://github.com/sunside2587',
    githubSecondary: 'https://github.com/sunside2587-creator',
    instagram: 'https://www.instagram.com/sandi.setianto',
    cvUrl: null, // [ISI]
  },
};

export const HERO_TECH_MARQUEE = [
  'REACT',
  'VUE.JS',
  'JAVASCRIPT',
  'TYPESCRIPT',
  'VITE',
  'NODE.JS',
  'EXPRESS',
  'POSTGRESQL',
  'MYSQL',
  'DBEAVER',
  'AWS',
  'GITHUB',
] as const;
