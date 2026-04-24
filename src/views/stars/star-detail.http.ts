import { GaiaClient } from '@/http/gaia/main.ts';
import type { RestResult } from '@/http/rest-client/types.ts';

export function fetchStarDetail(id: string): Promise<RestResult<Record<string, unknown>>> {
  const client = new GaiaClient();
  return client.stars.detail<Record<string, unknown>>(id);
}
