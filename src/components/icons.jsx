function svgProps({ size = 20, ...rest }) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    focusable: 'false',
    ...rest,
  };
}

export const IconHome = (p) => (
  <svg {...svgProps(p)}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></svg>
);

export const IconPackage = (p) => (
  <svg {...svgProps(p)}><path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" /><path d="m3 8 9 5 9-5" /><path d="M12 13v8" /></svg>
);

export const IconSliders = (p) => (
  <svg {...svgProps(p)}>
    <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12" />
    <circle cx="16" cy="6" r="2" /><circle cx="10" cy="12" r="2" /><circle cx="18" cy="18" r="2" />
  </svg>
);

export const IconMenu = (p) => (
  <svg {...svgProps(p)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);

export const IconX = (p) => (
  <svg {...svgProps(p)}><path d="M6 6l12 12M18 6 6 18" /></svg>
);

export const IconSearch = (p) => (
  <svg {...svgProps(p)}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);

export const IconBell = (p) => (
  <svg {...svgProps(p)}><path d="M6 16v-5a6 6 0 1 1 12 0v5l1.5 2h-15L6 16Z" /><path d="M10 20a2 2 0 0 0 4 0" /></svg>
);

export const IconChevronDown = (p) => (
  <svg {...svgProps(p)}><path d="m6 9 6 6 6-6" /></svg>
);

export const IconChevronLeft = (p) => (
  <svg {...svgProps(p)}><path d="m15 6-6 6 6 6" /></svg>
);

export const IconChevronRight = (p) => (
  <svg {...svgProps(p)}><path d="m9 6 6 6-6 6" /></svg>
);

export const IconSun = (p) => (
  <svg {...svgProps(p)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const IconMoon = (p) => (
  <svg {...svgProps(p)}><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" /></svg>
);

export const IconDownload = (p) => (
  <svg {...svgProps(p)}><path d="M12 4v11" /><path d="m7 10 5 5 5-5" /><path d="M5 20h14" /></svg>
);

export const IconCheck = (p) => (
  <svg {...svgProps(p)}><path d="m5 12 5 5 9-10" /></svg>
);

export const IconFilter = (p) => (
  <svg {...svgProps(p)}><path d="M4 5h16l-6 8v5l-4 2v-7L4 5Z" /></svg>
);

export const IconTruck = (p) => (
  <svg {...svgProps(p)}>
    <path d="M3 6h11v10H3z" /><path d="M14 10h4l3 3v3h-7" />
    <circle cx="7" cy="18" r="1.8" /><circle cx="17" cy="18" r="1.8" />
  </svg>
);

export const IconLeaf = (p) => (
  <svg {...svgProps(p)}><path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15Z" /><path d="M5 19c3-4 6-7 10-9" /></svg>
);
