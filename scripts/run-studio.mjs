import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const rootEnvPath = path.join(rootDir, '.env');
const studioDir = path.join(rootDir, 'studio');
const studioEnvPath = path.join(studioDir, '.env');

function parseEnv(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }
  const result = {};
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }
    const eqIndex = line.indexOf('=');
    if (eqIndex === -1) {
      continue;
    }
    const key = line.slice(0, eqIndex).trim();
    const val = line.slice(eqIndex + 1).trim().replace(/^["']|["']$/g, '');
    result[key] = val;
  }
  return result;
}

const env = parseEnv(rootEnvPath);
const projectId = env.VITE_CMS_PROJECT_ID || '';
const dataset = env.VITE_CMS_DATASET || 'production';

if (!projectId) {
  console.error('\n[Sanity Studio] VITE_CMS_PROJECT_ID masih kosong di file .env.');
  console.error('Silakan buka file .env di root proyek dan isi:');
  console.error('  VITE_CMS_PROJECT_ID=project_id_sanity_anda\n');
  process.exit(1);
}

fs.writeFileSync(
  studioEnvPath,
  `SANITY_STUDIO_PROJECT_ID=${projectId}\nSANITY_STUDIO_DATASET=${dataset}\n`,
  'utf8',
);

const cmd = process.argv[2] || 'dev';
const child = spawn('npm', ['--prefix', 'studio', 'run', cmd], {
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
