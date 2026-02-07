import { RestClient } from '@/http/rest-client/main';
import type { PaginatedResponse, RestResult } from '@/http/rest-client/types';
import type {
  StarsParams,
  StarsStats,
  PlanetsParams,
  PlanetsStats,
  GalaxiesParams,
  GalaxiesStats,
} from './types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

function buildPath(base: string, params?: Record<string, unknown>): string {
  if (!params) return base;

  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;

    if (Array.isArray(value)) {
      value.forEach(v => search.append(key, String(v)));
    } else {
      search.append(key, String(value));
    }
  }

  const qs = search.toString();
  return qs ? `${base}?${qs}` : base;
}

class Resource<TParams, TStats> {
  constructor(
    private client: RestClient,
    private basePath: string,
  ) {}

  list<T>(params?: TParams): Promise<RestResult<PaginatedResponse<T>>> {
    return this.client.get(buildPath(this.basePath, params as Record<string, unknown>));
  }

  detail<T>(id: number | string): Promise<RestResult<T>> {
    return this.client.get(`${this.basePath}${id}/`);
  }

  stats(): Promise<RestResult<TStats>> {
    return this.client.get(`${this.basePath}stats/`);
  }

  paginate<T>(params?: TParams) {
    return this.client.paginate<T>(buildPath(this.basePath, params as Record<string, unknown>));
  }
}

export class GaiaClient {
  private client: RestClient;

  stars: Resource<StarsParams, StarsStats>;
  planets: Resource<PlanetsParams, PlanetsStats>;
  galaxies: Resource<GalaxiesParams, GalaxiesStats>;

  constructor() {
    this.client = new RestClient({ baseUrl: BASE_URL });

    this.stars = new Resource(this.client, '/stars/');
    this.planets = new Resource(this.client, '/planets/');
    this.galaxies = new Resource(this.client, '/galaxies/');
  }
}
