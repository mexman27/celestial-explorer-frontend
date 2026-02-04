import type { PageDefinition } from '@/engine/page/types';

export const explorerPage: PageDefinition = {
  visualization: { mode: 'explore', highlightedStars: [] },
  sidebar: { view: 'star-list', filter: { maxDistance: 500 } },
  detail: null,
  header: { title: 'Solar Neighbourhood', breadcrumbs: [] },
};
