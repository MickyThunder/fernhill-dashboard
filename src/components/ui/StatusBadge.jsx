const STYLES = {
  pending: 'bg-pollen/15 text-[#7A5A12] dark:bg-pollen/15 dark:text-pollen',
  packed: 'bg-fern/15 text-[#2F5E3A] dark:bg-fern/15 dark:text-fern',
  shipped: 'bg-moss/10 text-moss dark:bg-moss/30 dark:text-[#A9D3BA]',
  cancelled: 'bg-rosehip/10 text-rosehip dark:bg-rosehip/20 dark:text-[#E59A9C]',
};

const LABELS = {
  pending: 'Pending',
  packed: 'Packed',
  shipped: 'Shipped',
  cancelled: 'Cancelled',
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${STYLES[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {LABELS[status]}
    </span>
  );
}
