import type { Row } from '@/components/card/card.ts';

export function formatLabel(field: string): string {
  return field
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

export function toRows(data: Record<string, unknown>, fields: string[]): Row[] {
  return fields
    .filter(f => data[f] != null && data[f] !== '')
    .map(f => ({ label: formatLabel(f), value: String(data[f]) }));
}
