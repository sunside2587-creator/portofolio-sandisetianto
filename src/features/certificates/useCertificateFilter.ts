import { startTransition, useCallback, useState } from 'react';
import type { FilterOption } from '@/components/ui/FilterTabs';
import type { Certificate, CertificateFilter } from '@/types/certificate';
import {
  filterByCategory,
  getCategoryCounts,
  getHighlights,
  sortByIssuedDesc,
} from './certificates.selectors';

const INITIAL_VISIBLE_COUNT = 8;

export function useCertificateFilter(certificates: readonly Certificate[]) {
  const [filter, setFilter] = useState<CertificateFilter>('all');
  const [showAll, setShowAll] = useState(false);

  const counts = getCategoryCounts(certificates);
  const filterOptions: readonly FilterOption<CertificateFilter>[] = [
    { value: 'all', label: 'ALL', count: counts.all },
    { value: 'course', label: 'COURSES', count: counts.course },
    { value: 'program', label: 'PROGRAMS', count: counts.program },
    { value: 'event', label: 'EVENTS', count: counts.event },
    { value: 'award', label: 'AWARDS', count: counts.award },
  ];

  const highlights = getHighlights(certificates);
  const filtered = sortByIssuedDesc(filterByCategory(certificates, filter));
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE_COUNT);
  const hasMore = filtered.length > INITIAL_VISIBLE_COUNT;

  const selectFilter = useCallback((nextFilter: CertificateFilter) => {
    startTransition(() => {
      setFilter(nextFilter);
      setShowAll(false);
    });
  }, []);

  const toggleShowAll = useCallback(() => {
    startTransition(() => {
      setShowAll((prev) => !prev);
    });
  }, []);

  return {
    filter,
    showAll,
    counts,
    filterOptions,
    highlights,
    filtered,
    visible,
    hasMore,
    selectFilter,
    toggleShowAll,
  };
}
