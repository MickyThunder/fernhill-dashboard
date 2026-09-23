import Card from '../ui/Card.jsx';
import { PLANTS } from '../../data/plants.js';
import { initials, pluralize } from '../../lib/format.js';

export default function TopPlants({ orders, className = '' }) {
  const units = new Map();
  orders
    .filter((order) => order.status !== 'cancelled')
    .forEach((order) => {
      order.items.forEach((item) => units.set(item.plantId, (units.get(item.plantId) ?? 0) + item.qty));
    });

  const ranked = PLANTS.map((plant) => ({ ...plant, sold: units.get(plant.id) ?? 0 }))
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 5);
  const top = ranked[0]?.sold || 1;

  return (
    <Card title="Best sellers" description="Plants sold in the last 14 days" className={className}>
      <ol className="space-y-4">
        {ranked.map((plant) => (
          <li key={plant.id} className="flex items-center gap-3">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-fern/20 text-xs font-semibold text-moss dark:text-fern"
              aria-hidden="true"
            >
              {initials(plant.name)}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="truncate text-sm font-medium">{plant.name}</p>
                <p className="muted shrink-0 text-sm tabular-nums">{pluralize(plant.sold, 'sold', 'sold')}</p>
              </div>
              <div className="mt-1.5 h-1.5 rounded-full bg-black/[0.05] dark:bg-white/10" aria-hidden="true">
                <div className="h-full rounded-full bg-fern" style={{ width: `${(plant.sold / top) * 100}%` }} />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Card>
  );
}
