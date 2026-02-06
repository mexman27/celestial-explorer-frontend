import { Routes } from './router';
import { PATHS } from './paths';
import * as Views from '@/views';

export const routes: Routes = {
  [PATHS.HOME]: Views.home,
  [PATHS.STARS]: Views.stars,
  [PATHS.PLANETS]: Views.planets,
  [PATHS.GALAXIES]: Views.galaxies,
};
