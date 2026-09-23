import Dropdown, { DropdownItem } from '../ui/Dropdown.jsx';
import { IconCheck, IconChevronDown, IconFilter } from '../icons.jsx';
import { STATUS_OPTIONS } from '../../data/orders.js';

export default function StatusFilter({ value, onChange, counts }) {
  const current = STATUS_OPTIONS.find((option) => option.value === value) ?? STATUS_OPTIONS[0];

  return (
    <Dropdown
      align="left"
      menuLabel="Filter by status"
      trigger={(props) => (
        <button {...props} className="btn btn-secondary">
          <IconFilter size={16} className="muted" />
          <span>{current.label}</span>
          <IconChevronDown size={16} className="muted" />
        </button>
      )}
    >
      {({ close }) =>
        STATUS_OPTIONS.map((option) => (
          <DropdownItem
            key={option.value}
            close={close}
            checked={option.value === value}
            onSelect={() => onChange(option.value)}
          >
            <span className="flex w-4 justify-center text-moss dark:text-fern">
              {option.value === value && <IconCheck size={16} />}
            </span>
            <span className="flex-1">{option.label}</span>
            <span className="muted text-xs tabular-nums">{counts[option.value] ?? 0}</span>
          </DropdownItem>
        ))
      }
    </Dropdown>
  );
}
