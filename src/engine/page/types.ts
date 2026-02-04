export interface VisualizationConfig {
  mode: 'explore' | 'focus' | 'compare' | 'portfolio';
  highlightedStars: string[];
  cameraTarget?: string;
}

export interface SidebarConfig {
  view: 'star-list' | 'search-results' | 'comparison' | 'portfolio';
  filter?: {
    maxDistance?: number;
    spectralTypes?: string[];
  };
}

export interface DetailConfig {
  starId: string;
}

export interface HeaderConfig {
  title: string;
  breadcrumbs: { label: string; path: string }[];
}

export interface PageDefinition {
  visualization: VisualizationConfig | null;
  sidebar: SidebarConfig | null;
  detail: DetailConfig | null;
  header: HeaderConfig;
}

export type PageUpdate = Partial<PageDefinition>;
