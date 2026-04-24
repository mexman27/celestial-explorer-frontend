// Fragment routes like '#/stars' or '#/stars?id=42' never leave the page —
// they're route paths, not URLs. Only http(s): links may navigate away.
export function isSafeUrl(href: string): boolean {
  if (href.startsWith('#')) return true;

  try {
    const url = new URL(href, window.location.href);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}
