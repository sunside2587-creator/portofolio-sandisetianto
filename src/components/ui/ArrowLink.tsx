import type { AnchorHTMLAttributes } from 'react';

interface ArrowLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  readonly label: string;
  readonly href: string;
  readonly tone?: 'ink' | 'paper';
  readonly className?: string;
}

export function ArrowLink({
  label,
  href,
  tone = 'ink',
  className = '',
  ...rest
}: ArrowLinkProps) {
  const isExternal = href.startsWith('http://') || href.startsWith('https://');
  const toneClass =
    tone === 'paper'
      ? 'text-paper hover:text-signal border-paper/30'
      : 'text-ink hover:text-signal border-ink/25';

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`group inline-flex min-h-11 items-center gap-3 border-b pb-1 text-xs font-semibold tracking-[0.16em] uppercase transition-colors ${toneClass} ${className}`}
      {...rest}
    >
      <span>{label}</span>
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-200 group-hover:translate-x-1"
      >
        ⟶
      </span>
    </a>
  );
}
