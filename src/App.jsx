import { useCallback, useEffect, useState } from 'react';
import Sidebar from './components/layout/Sidebar.jsx';
import Header from './components/layout/Header.jsx';
import Toast from './components/ui/Toast.jsx';
import OrderDetailsModal from './components/orders/OrderDetailsModal.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import { useTheme } from './hooks/useTheme.js';
import { INITIAL_ORDERS } from './data/orders.js';

const PAGES = {
  dashboard: 'Overview',
  orders: 'Orders',
  settings: 'Settings',
};

const DEFAULT_FILTERS = { status: 'all', query: '', page: 1 };

const DEFAULT_SETTINGS = {
  shopName: 'Fernhill Plants',
  email: 'hello@fernhillplants.example',
  pickupTime: '3:00 pm',
  notifications: { newOrders: true, lowStock: true, dailySummary: false },
};

function pageFromHash() {
  const id = window.location.hash.replace('#', '');
  return Object.hasOwn(PAGES, id) ? id : 'dashboard';
}

export default function App() {
  const [page, setPage] = useState(pageFromHash);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [toast, setToast] = useState('');

  useEffect(() => {
    // Only react to page hashes, so in-page links like #main don't reset the view.
    const handleHashChange = () => {
      const id = window.location.hash.replace('#', '');
      if (Object.hasOwn(PAGES, id)) setPage(id);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    document.title = `${PAGES[page]} | ${settings.shopName}`;
  }, [page, settings.shopName]);

  const navigate = useCallback((id) => {
    if (window.location.hash !== `#${id}`) window.location.hash = id;
    setPage(id);
    setSidebarOpen(false);
    window.scrollTo(0, 0);
  }, []);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const dismissToast = useCallback(() => setToast(''), []);

  function showOrders(nextFilters = {}) {
    setFilters({ ...DEFAULT_FILTERS, ...nextFilters });
    navigate('orders');
  }

  function markPacked(orderId) {
    setOrders((current) =>
      current.map((order) => (order.id === orderId ? { ...order, status: 'packed' } : order)),
    );
    setSelectedOrderId(null);
    setToast(`Order ${orderId} marked as packed`);
  }

  function saveSettings(next) {
    setSettings(next);
    setToast('Changes saved');
  }

  const pendingCount = orders.filter((order) => order.status === 'pending').length;
  const selectedOrder = orders.find((order) => order.id === selectedOrderId) ?? null;

  return (
    <div className="min-h-screen">
      <a
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById('main')?.focus();
        }}
        className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[70]"
      >
        Skip to content
      </a>

      <Sidebar
        current={page}
        onNavigate={navigate}
        open={sidebarOpen}
        onClose={closeSidebar}
        shopName={settings.shopName}
        pickupTime={settings.pickupTime}
        pendingCount={pendingCount}
      />

      <div className="lg:pl-64">
        <Header
          title={PAGES[page]}
          onOpenMenu={() => setSidebarOpen(true)}
          menuOpen={sidebarOpen}
          theme={theme}
          onToggleTheme={toggleTheme}
          pendingCount={pendingCount}
          onSearch={(query, status = 'all') => showOrders({ query, status })}
          onNavigate={navigate}
          onNotify={setToast}
        />

        <main id="main" tabIndex={-1} className="mx-auto max-w-7xl px-4 py-6 focus:outline-none sm:px-6 lg:px-8 lg:py-8">
          {page === 'dashboard' && (
            <DashboardPage
              orders={orders}
              pickupTime={settings.pickupTime}
              onStartPacking={() => showOrders({ status: 'pending' })}
              onViewOrders={() => showOrders()}
              onOpenOrder={setSelectedOrderId}
            />
          )}
          {page === 'orders' && (
            <OrdersPage
              orders={orders}
              filters={filters}
              onFiltersChange={(changes) => setFilters((current) => ({ ...current, ...changes }))}
              onOpenOrder={setSelectedOrderId}
            />
          )}
          {page === 'settings' && <SettingsPage key={JSON.stringify(settings)} settings={settings} onSave={saveSettings} />}

          <OrderDetailsModal
            order={selectedOrder}
            onClose={() => setSelectedOrderId(null)}
            onMarkPacked={markPacked}
          />
        </main>
      </div>

      <Toast message={toast} onDismiss={dismissToast} />
    </div>
  );
}
