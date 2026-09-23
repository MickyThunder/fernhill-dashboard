import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside.js';

const ITEM_SELECTOR = '[role="menuitem"], [role="menuitemradio"]';

/**
 * Accessible menu button.
 *
 * `trigger` receives the props that must be spread onto the button element.
 * `children` receives `{ close }` so items can close the menu after selecting.
 */
export default function Dropdown({ trigger, children, align = 'right', menuLabel, className = '' }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const menuId = useId();

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useClickOutside(rootRef, () => setOpen(false), open);

  useEffect(() => {
    if (!open) return;
    const selected = menuRef.current?.querySelector('[aria-checked="true"]');
    const first = menuRef.current?.querySelector(ITEM_SELECTOR);
    (selected ?? first)?.focus();
  }, [open]);

  function handleMenuKeyDown(event) {
    const items = Array.from(menuRef.current.querySelectorAll(ITEM_SELECTOR));
    const index = items.indexOf(document.activeElement);

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        close();
        break;
      case 'ArrowDown':
        event.preventDefault();
        items[(index + 1) % items.length]?.focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        items[(index - 1 + items.length) % items.length]?.focus();
        break;
      case 'Home':
        event.preventDefault();
        items[0]?.focus();
        break;
      case 'End':
        event.preventDefault();
        items[items.length - 1]?.focus();
        break;
      case 'Tab':
        setOpen(false);
        break;
      default:
    }
  }

  function handleTriggerKeyDown(event) {
    if (event.key === 'ArrowDown' && !open) {
      event.preventDefault();
      setOpen(true);
    }
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      {trigger({
        ref: triggerRef,
        type: 'button',
        onClick: () => setOpen((value) => !value),
        onKeyDown: handleTriggerKeyDown,
        'aria-haspopup': 'menu',
        'aria-expanded': open,
        'aria-controls': open ? menuId : undefined,
      })}
      {open && (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label={menuLabel}
          onKeyDown={handleMenuKeyDown}
          className={`absolute z-20 mt-2 min-w-[12rem] rounded-lg border border-black/10 bg-white p-1 shadow-lg shadow-ink/5 dark:border-night-border dark:bg-night-surface ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {children({ close })}
        </div>
      )}
    </div>
  );
}

export function DropdownItem({ children, onSelect, close, checked, tone = 'default' }) {
  const isRadio = checked !== undefined;
  return (
    <button
      type="button"
      role={isRadio ? 'menuitemradio' : 'menuitem'}
      aria-checked={isRadio ? checked : undefined}
      tabIndex={-1}
      onClick={() => {
        onSelect?.();
        close();
      }}
      className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-mist focus:bg-mist focus:outline-none dark:hover:bg-white/5 dark:focus:bg-white/5 ${
        tone === 'danger' ? 'text-rosehip dark:text-[#E59A9C]' : ''
      }`}
    >
      {children}
    </button>
  );
}
