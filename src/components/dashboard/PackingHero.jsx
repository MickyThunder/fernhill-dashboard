import { formatDate, formatLongDate, pluralize } from '../../lib/format.js';
import { orderItemCount } from '../../data/orders.js';

export default function PackingHero({ today, pickupTime, pendingOrders, onStartPacking, onViewOrders }) {
  const count = pendingOrders.length;
  const plants = pendingOrders.reduce((sum, order) => sum + orderItemCount(order), 0);
  const oldest = [...pendingOrders].sort((a, b) => a.date.localeCompare(b.date))[0];

  return (
    <section className="mb-6 flex flex-col gap-5 rounded-2xl bg-moss px-6 py-6 text-white sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:py-7">
      <div className="min-w-0">
        <p className="text-sm text-white/70">{formatLongDate(today)}</p>
        {count > 0 ? (
          <>
            <h2 className="mt-1 max-w-2xl text-2xl font-semibold leading-tight sm:text-3xl">
              {pluralize(count, 'order')} to pack before the {pickupTime} courier
            </h2>
            <p className="mt-2 text-sm text-white/80">
              {pluralize(plants, 'plant')} in the queue. The oldest order came in on {formatDate(oldest.date)}.
            </p>
          </>
        ) : (
          <>
            <h2 className="mt-1 text-2xl font-semibold leading-tight sm:text-3xl">Everything is packed</h2>
            <p className="mt-2 text-sm text-white/80">New orders will appear here as they come in.</p>
          </>
        )}
      </div>
      <button
        type="button"
        onClick={count > 0 ? onStartPacking : onViewOrders}
        className="btn shrink-0 self-start bg-white text-moss hover:bg-moss-50 focus-visible:ring-white focus-visible:ring-offset-moss sm:self-auto"
      >
        {count > 0 ? 'Start packing' : 'View orders'}
      </button>
    </section>
  );
}
