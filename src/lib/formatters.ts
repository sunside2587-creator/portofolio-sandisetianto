const MONTH_FORMATTER = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

const FULL_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const YEAR_PATTERN = /^\d{4}$/;

export function formatIssuedDate(iso: string | null): string {
  if (iso === null) {
    return '—';
  }
  if (YEAR_PATTERN.test(iso)) {
    return iso;
  }

  const match = FULL_DATE_PATTERN.exec(iso);
  if (!match) {
    return iso;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const utcDate = new Date(Date.UTC(year, month - 1, day));
  return MONTH_FORMATTER.format(utcDate);
}
