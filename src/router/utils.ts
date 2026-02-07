export function getQueryParams(): URLSearchParams {
  const idx = location.hash.indexOf('?');
  return new URLSearchParams(idx >= 0 ? location.hash.slice(idx + 1) : '');
}
