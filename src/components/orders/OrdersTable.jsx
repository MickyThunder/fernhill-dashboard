import StatusBadge from '../ui/StatusBadge.jsx';
import { formatDate, formatMoney, pluralize } from '../../lib/format.js';
import { orderItemCount, orderTotal } from '../../data/orders.js';

export default function OrdersTable({ orders, onOpenOrder, onClearFilters }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-sm">
        <caption className="sr-only">Orders. Select an order number to see its details.</caption>
        <thead className="border-b border-black/[0.06] bg-mist/60 text-xs text-ink/60 dark:border-night-border dark:bg-white/[0.02] dark:text-night-muted">
          <tr>
            <th scope="col" className="px-5 py-3 font-medium">Order</th>
            <th scope="col" className="px-5 py-3 font-medium">Customer</th>
            <th scope="col" className="px-5 py-3 font-medium">Plants</th>
            <th scope="col" className="px-5 py-3 font-medium">Placed</th>
            <th scope="col" className="px-5 py-3 font-medium">Status</th>
            <th scope="col" className="px-5 py-3 text-right font-medium">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/[0.05] dark:divide-night-border">
          {orders.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-5 py-14 text-center">
                <p className="font-medium">No orders match these filters</p>
                <p className="muted mt-1 text-sm">Try a different status or search term.</p>
                <button type="button" onClick={onClearFilters} className="btn btn-secondary mt-4">
                  Clear filters
                </button>
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr
                key={order.id}
                onClick={() => onOpenOrder(order.id)}
                className="cursor-pointer transition-colors hover:bg-mist/70 dark:hover:bg-white/[0.03]"
              >
                <td className="whitespace-nowrap px-5 py-3">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onOpenOrder(order.id);
                    }}
                    className="focus-ring rounded font-medium text-moss underline-offset-2 hover:underline dark:text-[#A9D3BA]"
                  >
                    {order.id}
                  </button>
                </td>
                <td className="px-5 py-3">
                  <div className="max-w-[15rem]">
                    <p className="truncate font-medium">{order.customer.name}</p>
                    <p className="muted truncate text-xs">{order.customer.email}</p>
                  </div>
                </td>
                <td className="whitespace-nowrap px-5 py-3">{pluralize(orderItemCount(order), 'plant')}</td>
                <td className="whitespace-nowrap px-5 py-3 tabular-nums">{formatDate(order.date)}</td>
                <td className="px-5 py-3">
                  <StatusBadge status={order.status} />
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-right font-medium tabular-nums">
                  {formatMoney(orderTotal(order))}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
