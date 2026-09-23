# Fernhill Plants dashboard

A small back-office dashboard for an independent plant shop. Staff use it to see what needs packing before the daily courier pickup, browse and filter orders, and adjust shop settings.

Built with React 18, Vite and Tailwind CSS. All data is mocked in `src/data`, so there is no backend, database or API key to set up.

## Getting started

You need Node.js 18 or newer.

```bash
npm install
npm run dev
```

Then open the local address Vite prints (usually http://localhost:5173).

To create a production build:

```bash
npm run build
npm run preview
```

## Features

- **Overview**: packing summary for today, sales for the last 14 days, packing queue, best sellers and low-stock plants.
- **Orders**: search, status filter, pagination, CSV export, and an order details dialog where pending orders can be marked as packed.
- **Settings**: shop details, courier pickup time and email notification preferences, with form validation.
- Light and dark themes, a responsive layout with a slide-out navigation drawer on small screens, and keyboard support for menus and dialogs.

## Project structure

```
src/
├── App.jsx                  App shell, page routing (URL hash) and shared state
├── components/
│   ├── layout/              Sidebar and header
│   ├── ui/                  Card, Dropdown, Modal, StatusBadge, Switch, Toast
│   ├── dashboard/           Overview page widgets
│   ├── orders/              Orders table, filter, pagination, details dialog
│   └── icons.jsx            Inline SVG icons
├── data/                    Mock plants, orders and sales
├── hooks/                   useTheme, useClickOutside
├── lib/format.js            Money, date and text helpers
└── pages/                   Overview, Orders and Settings pages
```
