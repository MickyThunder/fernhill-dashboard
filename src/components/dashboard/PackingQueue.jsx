import Card from '../ui/Card.jsx';
import { formatDate } from '../../lib/format.js';
import { orderSummary } from '../../data/orders.js';

export default function PackingQueue({ orders, onOpenOrder, onViewAll, className = '' }) {
  const queue = [...orders].sort((a, b) => a.date.localeCompare(b.date));
  const visible = queue.slice(0, 5);

  return (
    <Card
      title="Packing queue"
      description="Oldest orders first"
      className={className}
      bodyClassName="px-2 py-2"
      footer={
        queue.length > 0 && (
          <button type="button" onClick={onViewAll} className="focus-ring rounded text-sm font-medium text-moss hover:underline dark:text-[#A9D3BA]">
            View all {queue.length} pending orders
          </button>
        )
      }
    >
      {visible.length === 0 ? (
        <p className="muted px-3 py-8 text-center text-sm">Nothing waiting to be packed.</p>
      ) : (
        <ul>
          {visible.map((order) => (
            <li key={order.id}>
              <button
                type="button"
                onClick={() => onOpenOrder(order.id)}
                className="focus-ring flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-mist dark:hover:bg-white/[0.04]"
              >
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-sm font-medium">{order.customer.name}</span>
                    <span className="muted shrink-0 text-xs tabular-nums">{formatDate(order.date)}</span>
                  </span>
                  <span className="muted block truncate text-xs">
                    {order.id}, {orderSummary(order)}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
