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
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-[11px] font-medium tracking-[0.16em] text-paper/65 uppercase">
            {`© ${year} ${PROFILE.name.toUpperCase()}. ALL RIGHTS RESERVED.`}
          </p>

          <div className="flex flex-wrap items-center gap-6">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-[11px] font-semibold tracking-[0.18em] text-paper/80 uppercase transition-colors hover:text-signal"
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
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-paper uppercase transition-colors hover:text-signal"
            >
              <span>BACK TO TOP</span>
              <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
