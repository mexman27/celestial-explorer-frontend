import { FIELD_GROUPS, SKIP_FIELDS } from './star-detail.config.ts';

const GROUPED_FIELDS = new Set(FIELD_GROUPS.flatMap(g => g.fields));

export function getExtraFields(data: Record<string, unknown>): string[] {
  return Object.keys(data).filter(
    k => !SKIP_FIELDS.has(k) && !GROUPED_FIELDS.has(k),
  );
}
