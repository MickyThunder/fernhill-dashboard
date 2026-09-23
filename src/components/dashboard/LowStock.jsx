import Card from '../ui/Card.jsx';
import { LOW_STOCK_THRESHOLD, PLANTS } from '../../data/plants.js';

export default function LowStock({ className = '' }) {
  const low = PLANTS.filter((plant) => plant.stock <= LOW_STOCK_THRESHOLD).sort((a, b) => a.stock - b.stock);

  return (
    <Card title="Running low" description={`${LOW_STOCK_THRESHOLD} or fewer left in the greenhouse`} className={className}>
      {low.length === 0 ? (
        <p className="muted text-sm">All plants are well stocked.</p>
      ) : (
        <ul className="divide-y divide-black/[0.06] dark:divide-night-border">
          {low.map((plant) => (
            <li key={plant.id} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
              <span className="truncate text-sm">{plant.name}</span>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums ${
                  plant.stock <= 2
                    ? 'bg-rosehip/10 text-rosehip dark:bg-rosehip/20 dark:text-[#E59A9C]'
                    : 'bg-pollen/15 text-[#7A5A12] dark:text-pollen'
                }`}
              >
                {plant.stock} left
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
