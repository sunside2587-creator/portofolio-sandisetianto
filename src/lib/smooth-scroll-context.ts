import { createContext } from 'react';

export interface SmoothScrollApi {
  readonly stop: () => void;
  readonly start: () => void;
  readonly scrollTo: (target: string) => void;
}

const defaultSmoothScrollApi: SmoothScrollApi = {
  stop: () => undefined,
  start: () => undefined,
  scrollTo: (target: string) => {
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  },
};

export const SmoothScrollContext = createContext<SmoothScrollApi>(defaultSmoothScrollApi);
