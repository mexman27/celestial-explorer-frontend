export type PaginationParams = {
  page?: number;
  page_size?: number;
};

// -- Stars --

export type StarsParams = PaginationParams & {
  search?: string;
  spectral_class?: string;
  constellation?: string;
  min_magnitude?: number;
  max_magnitude?: number;
  max_distance?: number;
  ordering?: string;
};

export type StarsStats = {
  total: number;
  avg_distance: number;
  min_magnitude: number;
  max_magnitude: number;
  by_spectral_class: { spectral_class: string; count: number }[];
};

// -- Planets --

export type PlanetsParams = PaginationParams & {
  search?: string;
  planet_type?: string;
  is_exoplanet?: boolean;
  detection_method?: string;
  max_distance?: number;
  min_mass_earth?: number;
  max_mass_earth?: number;
  ordering?: string;
};

export type PlanetsStats = {
  total: number;
  exoplanets: number;
  avg_distance: number;
  by_type: { planet_type: string; count: number }[];
  by_detection_method: { detection_method: string; count: number }[];
};

// -- Galaxies --

export type GalaxiesParams = PaginationParams & {
  search?: string;
  morphology?: string | string[];
  galaxy_group?: string;
  max_distance?: number;
  ordering?: string;
};

export type GalaxiesStats = {
  total: number;
  avg_distance: number;
  by_morphology: { morphology: string; count: number }[];
};
