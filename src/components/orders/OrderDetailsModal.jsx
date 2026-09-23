import Modal from '../ui/Modal.jsx';
import StatusBadge from '../ui/StatusBadge.jsx';
import { formatDate, formatMoney } from '../../lib/format.js';
import { getPlant } from '../../data/plants.js';
import { orderShipping, orderSubtotal, orderTotal } from '../../data/orders.js';

export default function OrderDetailsModal({ order, onClose, onMarkPacked }) {
  return (
    <Modal
      open={Boolean(order)}
      onClose={onClose}
      title={order ? `Order ${order.id}` : ''}
      footer={
        order && (
          <>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            {order.status === 'pending' && (
              <button type="button" className="btn btn-primary" onClick={() => onMarkPacked(order.id)}>
                Mark as packed
              </button>
            )}
          </>
        )
      }
    >
      {order && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={order.status} />
            <span className="muted text-sm">Placed {formatDate(order.date)}</span>
          </div>

          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <div className="min-w-0">
              <dt className="muted text-xs">Customer</dt>
              <dd className="mt-1 font-medium">{order.customer.name}</dd>
              <dd className="muted break-words">{order.customer.email}</dd>
            </div>
            <div className="min-w-0">
              <dt className="muted text-xs">Ship to</dt>
              <dd className="mt-1">{order.address}</dd>
            </div>
          </dl>

          <div>
            <h3 className="muted mb-2 text-xs font-normal">Plants</h3>
            <ul className="divide-y divide-black/[0.06] rounded-lg border border-black/[0.07] dark:divide-night-border dark:border-night-border">
              {order.items.map((item) => {
                const plant = getPlant(item.plantId);
                return (
                  <li key={item.plantId} className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm">
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{plant.name}</span>
                      <span className="muted text-xs">
                        {item.qty} × {formatMoney(plant.price)}
                      </span>
                    </span>
                    <span className="shrink-0 tabular-nums">{formatMoney(plant.price * item.qty)}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <dl className="space-y-1.5 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="muted">Subtotal</dt>
              <dd className="tabular-nums">{formatMoney(orderSubtotal(order))}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="muted">Shipping</dt>
              <dd className="tabular-nums">
                {orderShipping(order) === 0 ? 'Free' : formatMoney(orderShipping(order))}
              </dd>
            </div>
            <div className="flex justify-between gap-3 border-t border-black/[0.06] pt-2 font-semibold dark:border-night-border">
              <dt>Total</dt>
              <dd className="tabular-nums">{formatMoney(orderTotal(order))}</dd>
            </div>
          </dl>
        </div>
      )}
    </Modal>
  );
}
