import { IconChevronLeft, IconChevronRight } from '../icons.jsx';

export default function Pagination({ page, pageSize, total, onPageChange }) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <nav className="flex flex-wrap items-center justify-between gap-3" aria-label="Orders pages">
      <p className="muted text-sm">
        {total === 0 ? 'No orders' : `Showing ${start} to ${end} of ${total} orders`}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="btn btn-secondary px-2.5"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          <IconChevronLeft size={18} />
        </button>
        <span className="text-sm tabular-nums" aria-live="polite">
          Page {page} of {pageCount}
        </span>
        <button
          type="button"
          className="btn btn-secondary px-2.5"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pageCount}
          aria-label="Next page"
        >
          <IconChevronRight size={18} />
        </button>
      </div>
    </nav>
  );
}
