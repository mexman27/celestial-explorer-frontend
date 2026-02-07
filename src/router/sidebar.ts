import { PATHS } from './paths';

export type SidebarLink = {
  label: string;
  href: string;
};

export const sidebarLinks: Record<string, SidebarLink[]> = {
  [PATHS.HOME]: [
    { label: 'Overview', href: PATHS.HOME_OVERVIEW },
    { label: 'Getting Started', href: PATHS.HOME_GETTING_STARTED },
    { label: 'About', href: PATHS.HOME_ABOUT },
  ],

  [PATHS.STARS]: [
    { label: 'Brightest Stars', href: PATHS.STARS_BRIGHTEST },
    { label: 'Nearest Stars', href: PATHS.STARS_NEAREST },
    { label: 'Star Types', href: PATHS.STARS_TYPES },
  ],

  [PATHS.PLANETS]: [
    { label: 'Rocky Planets', href: PATHS.PLANETS_ROCKY },
    { label: 'Gas Giants', href: PATHS.PLANETS_GAS_GIANTS },
    { label: 'Exoplanets', href: PATHS.PLANETS_EXOPLANETS },
  ],

  [PATHS.GALAXIES]: [
    { label: 'Spiral Galaxies', href: PATHS.GALAXIES_SPIRAL },
    { label: 'Elliptical Galaxies', href: PATHS.GALAXIES_ELLIPTICAL },
    { label: 'Dwarf Galaxies', href: PATHS.GALAXIES_DWARF },
  ],

  [PATHS.DESIGN_SYSTEM]: [
    { label: 'Button', href: PATHS.DESIGN_SYSTEM_BUTTON },
    { label: 'Card', href: PATHS.DESIGN_SYSTEM_CARD },
    { label: 'Input', href: PATHS.DESIGN_SYSTEM_INPUT },
  ],
};
