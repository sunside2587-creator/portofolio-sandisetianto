import type { Certificate } from '@/types/certificate';
import { getCertificateImage } from './certificate-images';

interface DicodingInput {
  readonly slug: string;
  readonly title: string;
  readonly issuedAt: string;
  readonly credentialId: string;
  readonly featured?: boolean;
  readonly skills: readonly string[];
}

function addYears(isoDate: string, years: number): string {
  const parts = isoDate.split('-');
  const yearStr = parts[0];
  if (!yearStr || parts.length !== 3) {
    return isoDate;
  }
  const nextYear = Number(yearStr) + years;
  return `${nextYear}-${parts[1]}-${parts[2]}`;
}

export function createDicodingCertificate(input: DicodingInput): Certificate {
  const image = getCertificateImage(input.slug, `Dicoding Certificate: ${input.title}`);
  const base: Certificate = {
    id: input.slug,
    title: input.title,
    issuer: 'Dicoding Indonesia',
    category: 'course',
    issuedAt: input.issuedAt,
    expiresAt: addYears(input.issuedAt, 3),
    credentialId: input.credentialId,
    verifyUrl: `https://www.dicoding.com/certificates/${input.credentialId}`,
    pdfUrl: `/certificates/${input.slug}.pdf`,
    skills: input.skills,
  };

  if (input.featured !== undefined) {
    return image ? { ...base, featured: input.featured, image } : { ...base, featured: input.featured };
  }
  return image ? { ...base, image } : base;
}
