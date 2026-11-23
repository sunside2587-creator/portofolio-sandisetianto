import { describe, expect, it } from 'vitest';
import { CERTIFICATES } from '@/content/certificates';
import {
  countByCategory,
  filterByCategory,
  getCategoryCounts,
  getHighlights,
  sortByIssuedDesc,
} from './certificates.selectors';

describe('certificates inventory & selectors', () => {
  it('contains exactly 19 unique entries without duplicate React Fundamental', () => {
    expect(CERTIFICATES).toHaveLength(19);
    const ids = new Set(CERTIFICATES.map((c) => c.id));
    expect(ids.size).toBe(19);
    expect(ids.has('dicoding-react-fundamental')).toBe(true);
    expect(CERTIFICATES.filter((c) => c.credentialId === 'N9ZO0M5O8XG5')).toHaveLength(1);
  });

  it('computes exact category counts matching Lampiran A', () => {
    expect(getCategoryCounts(CERTIFICATES)).toEqual({
      all: 19,
      course: 11,
      program: 3,
      event: 2,
      award: 3,
    });
    expect(countByCategory(CERTIFICATES, 'award')).toBe(3);
  });

  it('sorts by issuedAt descending with null dates last', () => {
    const sorted = sortByIssuedDesc(CERTIFICATES);
    expect(sorted[0]?.id).toBe('dicoding-backend-js');
    expect(sorted[0]?.issuedAt).toBe('2026-11-08');
    expect(sorted[sorted.length - 1]?.id).toBe('juara-2-fotografi');
    expect(sorted[sorted.length - 1]?.issuedAt).toBeNull();
  });

  it('returns the 3 expected highlights excluding MFD 2018', () => {
    const highlights = getHighlights(CERTIFICATES);
    expect(highlights.map((h) => h.id)).toEqual([
      'cloudcamp-pekanbaru-2026',
      'iot-simulation-terbaik',
      'juara-2-fotografi',
    ]);
  });

  it('filters by category accurately', () => {
    expect(filterByCategory(CERTIFICATES, 'all')).toHaveLength(19);
    expect(filterByCategory(CERTIFICATES, 'program')).toHaveLength(3);
    expect(filterByCategory(CERTIFICATES, 'event')).toHaveLength(2);
  });

  it('derives Dicoding verifyUrl and 3-year expiresAt deterministically', () => {
    const backend = CERTIFICATES.find((c) => c.id === 'dicoding-backend-js');
    expect(backend?.verifyUrl).toBe('https://www.dicoding.com/certificates/EYX4OG1EJXDL');
    expect(backend?.expiresAt).toBe('2029-11-08');
  });
});
