import { PATHS } from '../paths';
import { getQueryParams } from '../utils';
import * as Views from '@/views';

export const starsRoute = {
  [PATHS.STARS]: () => {
    const params = getQueryParams();
    const id = params.get('id');
    return id ? Views.starDetail(id) : Views.stars();
  },
};
