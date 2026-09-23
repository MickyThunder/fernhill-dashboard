import { useEffect } from 'react';
import { IconCheck } from '../icons.jsx';

export default function Toast({ message, onDismiss }) {
  useEffect(() => {
    if (!message) return undefined;
    const timer = setTimeout(onDismiss, 3500);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-[60] flex justify-center sm:inset-x-auto sm:right-6 sm:justify-end"
    >
      {message && (
        <div className="pointer-events-auto flex items-center gap-2 rounded-lg bg-ink px-4 py-3 text-sm text-white shadow-lg dark:bg-night-text dark:text-night">
          <IconCheck size={18} />
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}
