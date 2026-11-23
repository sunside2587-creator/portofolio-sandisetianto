import type { Service } from '@/types/content';

export const SERVICES: readonly Service[] = [
  {
    id: 'frontend-dev',
    title: 'FRONTEND DEVELOPMENT',
    description:
      'Accessible, component-driven interfaces built with strict TypeScript, semantic HTML, and smooth motion.',
    icon: 'half-circle',
    tools: ['React', 'Vue.js', 'JavaScript', 'Vite'],
  },
  {
    id: 'backend-dev',
    title: 'BACK-END & DATABASES',
    description:
      'Structured Express APIs, relational data modeling in PostgreSQL & MySQL, and cloud deployment.',
    icon: 'squares',
    tools: ['Node.js', 'Express', 'PostgreSQL', 'MySQL', 'DBeaver'],
  },
  {
    id: 'iot-prototyping',
    title: 'CLOUD & IOT SYSTEMS',
    description:
      'Deploying web services on AWS alongside Python scripts and sensor-driven IoT prototypes.',
    icon: 'target',
    tools: ['AWS', 'Python', 'IoT Hardware'],
  },
  {
    id: 'spec-driven-ai',
    title: 'SPEC-DRIVEN & GIT FLOW',
    description:
      'Structured specification-first software delivery with clean GitHub collaboration and AI tooling.',
    icon: 'quad',
    tools: ['GitHub', 'Git', 'Kiro', 'AI Fundamentals'],
  },
];
