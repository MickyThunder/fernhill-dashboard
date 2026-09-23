import { useState } from 'react';
import Dropdown, { DropdownItem } from '../ui/Dropdown.jsx';
import { IconBell, IconChevronDown, IconMenu, IconMoon, IconSearch, IconSun } from '../icons.jsx';
import { initials } from '../../lib/format.js';

const USER = { name: 'Jo Rivera', role: 'Owner' };

export default function Header({ title, onOpenMenu, menuOpen, theme, onToggleTheme, pendingCount, onSearch, onNavigate, onNotify }) {
  const [query, setQuery] = useState('');

  function handleSearch(event) {
    event.preventDefault();
    onSearch(query.trim());
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-black/[0.07] bg-mist/85 px-4 backdrop-blur sm:px-6 lg:px-8 dark:border-night-border dark:bg-night/85">
      <button
        type="button"
        className="btn-icon -ml-2 lg:hidden"
        onClick={onOpenMenu}
        aria-label="Open navigation"
        aria-controls="main-navigation"
        aria-expanded={menuOpen}
      >
        <IconMenu />
      </button>

      <h1 className="min-w-0 truncate text-lg font-semibold">{title}</h1>

      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        <form role="search" onSubmit={handleSearch} className="relative hidden md:block">
          <label htmlFor="global-search" className="sr-only">
            Search orders
          </label>
          <IconSearch
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 dark:text-night-muted"
          />
          <input
            id="global-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search orders or customers"
            className="input w-64 pl-9"
          />
        </form>

        <button
          type="button"
          className="btn-icon"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {theme === 'dark' ? <IconSun /> : <IconMoon />}
        </button>

        <button
          type="button"
          className="btn-icon"
          onClick={() => onSearch('', 'pending')}
          aria-label={`${pendingCount} orders waiting to be packed`}
        >
          <IconBell />
          {pendingCount > 0 && (
            <span
              className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-pollen ring-2 ring-mist dark:ring-night"
              aria-hidden="true"
            />
          )}
        </button>

        <Dropdown
          menuLabel="Account"
          trigger={(props) => (
            <button
              {...props}
              className="focus-ring flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 hover:bg-black/5 dark:hover:bg-white/5"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-moss-50 text-xs font-semibold text-moss dark:bg-white/10 dark:text-[#A9D3BA]">
                {initials(USER.name)}
              </span>
              <span className="hidden text-left sm:block">
                <span className="block text-sm font-medium leading-tight">{USER.name}</span>
                <span className="muted block text-xs leading-tight">{USER.role}</span>
              </span>
              <IconChevronDown size={16} className="muted" />
            </button>
          )}
        >
          {({ close }) => (
            <>
              <DropdownItem close={close} onSelect={() => onNavigate('settings')}>
                Shop settings
              </DropdownItem>
              <DropdownItem close={close} onSelect={onToggleTheme}>
                {theme === 'dark' ? 'Use light theme' : 'Use dark theme'}
              </DropdownItem>
              <div className="my-1 h-px bg-black/[0.06] dark:bg-night-border" role="separator" />
              <DropdownItem close={close} tone="danger" onSelect={() => onNotify('Signing out is turned off in this demo.')}>
                Sign out
              </DropdownItem>
            </>
          )}
        </Dropdown>
      </div>
    </header>
  );
}
