import Card from '../components/ui/Card.jsx';
import OrdersTable from '../components/orders/OrdersTable.jsx';
import Pagination from '../components/orders/Pagination.jsx';
import StatusFilter from '../components/orders/StatusFilter.jsx';
import { IconDownload, IconSearch } from '../components/icons.jsx';
import { orderItemCount, orderTotal } from '../data/orders.js';

const PAGE_SIZE = 8;

function matchesQuery(order, query) {
  if (!query) return true;
  const needle = query.toLowerCase();
  return [order.id, order.customer.name, order.customer.email].some((field) =>
    field.toLowerCase().includes(needle),
  );
}

function downloadCsv(orders) {
  const header = ['Order', 'Customer', 'Email', 'Placed', 'Status', 'Plants', 'Total'];
  const rows = orders.map((order) => [
    order.id,
    order.customer.name,
    order.customer.email,
    order.date,
    order.status,
    orderItemCount(order),
    orderTotal(order).toFixed(2),
  ]);
  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(','))
    .join('\n');

  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'fernhill-orders.csv';
  link.click();
  URL.revokeObjectURL(url);
}

export default function OrdersPage({ orders, filters, onFiltersChange, onOpenOrder }) {
  const { status, query, page } = filters;

  const counts = orders.reduce(
    (acc, order) => ({ ...acc, [order.status]: (acc[order.status] ?? 0) + 1 }),
    { all: orders.length },
  );

  const filtered = orders.filter(
    (order) => (status === 'all' || order.status === status) && matchesQuery(order, query),
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <Card
      title="All orders"
      description="Select an order to see the plants, address and totals."
      bodyClassName="p-0"
      actions={
        <>
          <div className="relative w-full sm:w-56">
            <label htmlFor="orders-search" className="sr-only">
              Search orders
            </label>
            <IconSearch
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 dark:text-night-muted"
            />
            <input
              id="orders-search"
              type="search"
              value={query}
              onChange={(event) => onFiltersChange({ query: event.target.value, page: 1 })}
              placeholder="Order, name or email"
              className="input pl-9"
            />
          </div>
          <StatusFilter value={status} counts={counts} onChange={(value) => onFiltersChange({ status: value, page: 1 })} />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => downloadCsv(filtered)}
            disabled={filtered.length === 0}
          >
            <IconDownload size={16} className="muted" />
            Export CSV
          </button>
        </>
      }
      footer={
        <Pagination
          page={currentPage}
          pageSize={PAGE_SIZE}
          total={filtered.length}
          onPageChange={(next) => onFiltersChange({ page: next })}
        />
      }
    >
      <OrdersTable
        orders={visible}
        onOpenOrder={onOpenOrder}
        onClearFilters={() => onFiltersChange({ status: 'all', query: '', page: 1 })}
      />
    </Card>
  );
}
