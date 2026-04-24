import { GaiaClient } from '@/http/gaia/main.ts';
import type { StarPoint } from '@/integrations/three/objects/star-field.ts';
import type { SpectralColorMap, StarRecord } from './stars.types.ts';
import { toStarPoint } from './stars.transform.ts';
import { createLogger } from '@/services/logger/main.ts';

const log = createLogger('stars');

export async function loadStars(
  colors: SpectralColorMap,
  points: StarPoint[],
  records: StarRecord[],
): Promise<void> {
  const client = new GaiaClient();

  for await (const page of client.stars.paginate<StarRecord>({ page_size: 5000 })) {
    if (!page.ok) {
      log.error('Failed to fetch stars', page.error);
      break;
    }

    const valid = page.data.results.filter(
      s => s.x_parsecs != null && s.y_parsecs != null && s.z_parsecs != null,
    );

    for (const star of valid) {
      points.push(toStarPoint(star, colors));
      records.push(star);
    }
  }
}
