import type { Certificate, CertificateCategory, CertificateFilter } from '@/types/certificate';

function normalizeSortDate(issuedAt: string): string {
  return issuedAt.length === 4 ? `${issuedAt}-00-00` : issuedAt;
}

export function sortByIssuedDesc(list: readonly Certificate[]): readonly Certificate[] {
  return list.toSorted((a, b) => {
    if (a.issuedAt === null && b.issuedAt === null) {
      return a.title.localeCompare(b.title);
    }
    if (a.issuedAt === null) {
      return 1;
    }
    if (b.issuedAt === null) {
      return -1;
    }
    const cmp = normalizeSortDate(b.issuedAt).localeCompare(normalizeSortDate(a.issuedAt));
    return cmp !== 0 ? cmp : a.title.localeCompare(b.title);
  });
}

export function filterByCategory(
  list: readonly Certificate[],
  filter: CertificateFilter,
): readonly Certificate[] {
  if (filter === 'all') {
    return list;
  }
  return list.filter((item) => item.category === filter);
}

export function countByCategory(
  list: readonly Certificate[],
  category: CertificateCategory,
): number {
  let count = 0;
  for (const item of list) {
    if (item.category === category) {
      count += 1;
    }
  }
  return count;
}

export function getCategoryCounts(
  list: readonly Certificate[],
): Readonly<Record<CertificateFilter, number>> {
  const counts: Record<CertificateFilter, number> = {
    all: list.length,
    course: 0,
    program: 0,
    event: 0,
    award: 0,
  };

  for (const item of list) {
    counts[item.category] += 1;
  }

  return counts;
}

export function getHighlights(list: readonly Certificate[]): readonly Certificate[] {
  return list.filter((item) => item.featuredHighlight === true).slice(0, 3);
}
