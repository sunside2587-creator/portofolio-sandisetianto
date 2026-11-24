import { use } from 'react';
import { PROFILE } from '@/content/profile';
import { SmoothScrollContext } from '@/lib/smooth-scroll-context';
import type { SocialLink } from '@/types/content';
import { Container } from './Container';

function getAvailableSocials(): readonly SocialLink[] {
  const candidates: Array<{ label: string; href: string | null }> = [
    { label: 'LINKEDIN', href: PROFILE.contact.linkedin },
    { label: 'GITHUB', href: PROFILE.contact.github },
    { label: 'GITHUB (CREATOR)', href: PROFILE.contact.githubSecondary ?? null },
    { label: 'INSTAGRAM', href: PROFILE.contact.instagram },
  ];
  return candidates.filter((item): item is SocialLink => item.href !== null);
}

export function Footer() {
  const { scrollTo } = use(SmoothScrollContext);
  const socials = getAvailableSocials();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-paper/15 bg-ink py-6 text-paper">
      <Container>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 sm:order-2 sm:gap-6">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center text-[11px] font-semibold tracking-[0.16em] text-paper/80 uppercase transition-colors hover:text-signal sm:min-h-11 sm:tracking-[0.18em]"
              >
                {social.label}
              </a>
            ))}

            <button
              type="button"
              onClick={() => {
                scrollTo('#top');
                window.history.replaceState(null, '', '#top');
              }}
              className="ml-auto inline-flex min-h-10 cursor-pointer items-center gap-2 border border-paper/25 px-3 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-paper uppercase transition-colors hover:border-signal hover:text-signal sm:ml-0 sm:min-h-11 sm:border-0 sm:px-0 sm:py-0"
            >
              <span>TOP</span>
              <span aria-hidden="true">↑</span>
            </button>
          </div>

          <p className="border-t border-paper/10 pt-4 text-[10px] font-medium tracking-[0.16em] text-paper/65 uppercase sm:order-1 sm:border-0 sm:pt-0 sm:text-[11px]">
            {`© ${year} ${PROFILE.name.toUpperCase()}. ALL RIGHTS RESERVED.`}
          </p>
        </div>
      </Container>
    </footer>
  );
}
