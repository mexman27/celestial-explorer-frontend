import { Routes } from './router';
import { PATHS } from './paths';
import * as Views from '@/views';

export const routes: Routes = {
  [PATHS.HOME]: Views.home,
  [PATHS.HOME_OVERVIEW]: Views.homeOverview,
  [PATHS.HOME_GETTING_STARTED]: Views.homeGettingStarted,
  [PATHS.HOME_ABOUT]: Views.homeAbout,

  [PATHS.STARS]: Views.stars,
  [PATHS.STARS_BRIGHTEST]: Views.starsBrightest,
  [PATHS.STARS_NEAREST]: Views.starsNearest,
  [PATHS.STARS_TYPES]: Views.starsTypes,

  [PATHS.PLANETS]: Views.planets,
  [PATHS.PLANETS_ROCKY]: Views.planetsRocky,
  [PATHS.PLANETS_GAS_GIANTS]: Views.planetsGasGiants,
  [PATHS.PLANETS_EXOPLANETS]: Views.planetsExoplanets,

  [PATHS.GALAXIES]: Views.galaxies,
  [PATHS.GALAXIES_SPIRAL]: Views.galaxiesSpiral,
  [PATHS.GALAXIES_ELLIPTICAL]: Views.galaxiesElliptical,
  [PATHS.GALAXIES_DWARF]: Views.galaxiesDwarf,
};
