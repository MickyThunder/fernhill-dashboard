const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const moneyRounded = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

// Dates in the data are plain YYYY-MM-DD strings. Parse them as local dates
// so they don't shift a day depending on the viewer's time zone.
export function parseDate(value) {
  const [y, m, d] = value.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function formatMoney(value, { rounded = false } = {}) {
  return (rounded ? moneyRounded : money).format(value);
}

export function formatDate(value) {
  return parseDate(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatLongDate(value) {
  return parseDate(value).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

export function pluralize(count, singular, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => (part.match(/\p{L}/u)?.[0] ?? '').toUpperCase())
    .join('');
}
