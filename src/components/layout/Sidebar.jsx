import { useEffect, useRef } from 'react';
import { IconHome, IconLeaf, IconPackage, IconSliders, IconTruck, IconX } from '../icons.jsx';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Overview', icon: IconHome },
  { id: 'orders', label: 'Orders', icon: IconPackage },
  { id: 'settings', label: 'Settings', icon: IconSliders },
];

export default function Sidebar({ current, onNavigate, open, onClose, shopName, pickupTime, pendingCount }) {
  const closeButtonRef = useRef(null);

  // On small screens the sidebar is a drawer: move focus into it when it opens,
  // close it with Escape, and hand focus back to whatever opened it.
  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocused instanceof HTMLElement && document.body.contains(previouslyFocused)) {
        previouslyFocused.focus();
      }
    };
  }, [open, onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-ink/40 transition-opacity lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        id="main-navigation"
        aria-label="Main navigation"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col lg:w-64 border-r border-black/[0.07] bg-white duration-200 dark:border-night-border dark:bg-night-surface lg:visible lg:translate-x-0 ${
          // Visibility only waits for the slide when closing, so focus can move in immediately on open.
          open ? 'visible translate-x-0 transition-transform' : 'invisible -translate-x-full transition-[transform,visibility]'
        }`}
      >
        <div className="flex h-16 items-center gap-3 border-b border-black/[0.07] px-5 dark:border-night-border">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-moss text-white">
            <IconLeaf size={20} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-base font-semibold leading-tight">{shopName}</p>
            <p className="muted text-xs">Shop dashboard</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="btn-icon lg:hidden"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <IconX />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
              const active = current === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      onNavigate(id);
                    }}
                    aria-current={active ? 'page' : undefined}
                    className={`focus-ring flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? 'bg-moss-50 text-moss dark:bg-white/[0.06] dark:text-[#A9D3BA]'
                        : 'text-ink/70 hover:bg-mist hover:text-ink dark:text-night-muted dark:hover:bg-white/5 dark:hover:text-night-text'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="flex-1">{label}</span>
                    {id === 'orders' && pendingCount > 0 && (
                      <span className="rounded-full bg-pollen/20 px-2 py-0.5 text-xs font-semibold tabular-nums text-[#7A5A12] dark:text-pollen">
                        {pendingCount}
                        <span className="sr-only"> to pack</span>
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="m-3 flex items-start gap-3 rounded-lg bg-mist p-3 text-sm dark:bg-white/[0.04]">
          <IconTruck size={18} className="mt-0.5 shrink-0 text-moss dark:text-fern" />
          <p>
            <span className="font-medium">Courier pickup</span>
            <span className="muted block">Today at {pickupTime}</span>
          </p>
        </div>
      </aside>
    </>
  );
}
