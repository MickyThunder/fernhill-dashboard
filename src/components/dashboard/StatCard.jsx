export default function StatCard({ label, value, note, positive = false }) {
  return (
    <div className="rounded-xl border border-black/[0.07] bg-white p-5 dark:border-night-border dark:bg-night-surface">
      <p className="muted text-sm">{label}</p>
      <p className="mt-2 font-display text-2xl font-semibold tabular-nums">{value}</p>
      {note && (
        <p className={`mt-1 text-xs ${positive ? 'text-moss dark:text-fern' : 'muted'}`}>{note}</p>
      )}
    </div>
  );
}
