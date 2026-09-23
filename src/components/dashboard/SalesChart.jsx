import Card from '../ui/Card.jsx';
import { formatDate, formatMoney, parseDate } from '../../lib/format.js';

function shortMoney(value) {
  if (value === 0) return '$0';
  return value >= 1000 ? `$${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k` : `$${value}`;
}

export default function SalesChart({ data, className = '' }) {
  const total = data.reduce((sum, day) => sum + day.amount, 0);
  const max = Math.max(...data.map((day) => day.amount));
  const scaleMax = Math.ceil(max / 400) * 400;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((fraction) => fraction * scaleMax);
  const best = data.find((day) => day.amount === max);

  return (
    <Card
      title="Sales"
      description={`${formatDate(data[0].date)} to ${formatDate(data[data.length - 1].date)}`}
      actions={<p className="font-display text-lg font-semibold tabular-nums">{formatMoney(total, { rounded: true })}</p>}
      className={className}
    >
      <p className="sr-only">
        Best day was {formatDate(best.date)} with {formatMoney(best.amount, { rounded: true })}.
      </p>
      <div className="grid grid-cols-[2.5rem_1fr] gap-x-3">
        <div className="relative h-56 text-right text-[11px] tabular-nums text-ink/50 dark:text-night-muted" aria-hidden="true">
          {ticks.map((tick) => (
            <span key={tick} className="absolute right-0 translate-y-1/2" style={{ bottom: `${(tick / scaleMax) * 100}%` }}>
              {shortMoney(tick)}
            </span>
          ))}
        </div>

        <div className="relative h-56">
          {ticks.map((tick) => (
            <div
              key={tick}
              className="absolute inset-x-0 border-t border-black/[0.06] dark:border-white/10"
              style={{ bottom: `${(tick / scaleMax) * 100}%` }}
              aria-hidden="true"
            />
          ))}
          <ul className="relative flex h-full items-end gap-1 sm:gap-2" aria-label="Sales per day">
            {data.map((day, index) => {
              const isToday = index === data.length - 1;
              return (
                <li key={day.date} className="flex h-full flex-1 items-end">
                  <div
                    className={`w-full rounded-t ${isToday ? 'bg-moss dark:bg-fern' : 'bg-fern/50 dark:bg-fern/35'}`}
                    style={{ height: `${(day.amount / scaleMax) * 100}%` }}
                    title={`${formatDate(day.date)}: ${formatMoney(day.amount, { rounded: true })}`}
                  >
                    <span className="sr-only">
                      {formatDate(day.date)}: {formatMoney(day.amount, { rounded: true })}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div aria-hidden="true" />
        <div className="mt-2 flex gap-1 text-[11px] tabular-nums text-ink/50 sm:gap-2 dark:text-night-muted" aria-hidden="true">
          {data.map((day, index) => (
            <span key={day.date} className={`flex-1 text-center ${index % 2 === 1 ? 'invisible sm:visible' : ''}`}>
              {parseDate(day.date).getDate()}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
