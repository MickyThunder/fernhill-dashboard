import PackingHero from '../components/dashboard/PackingHero.jsx';
import StatCard from '../components/dashboard/StatCard.jsx';
import SalesChart from '../components/dashboard/SalesChart.jsx';
import PackingQueue from '../components/dashboard/PackingQueue.jsx';
import TopPlants from '../components/dashboard/TopPlants.jsx';
import LowStock from '../components/dashboard/LowStock.jsx';
import { DAILY_SALES, PREVIOUS_PERIOD_TOTAL } from '../data/sales.js';
import { TODAY, orderItemCount, orderTotal } from '../data/orders.js';
import { formatMoney } from '../lib/format.js';

export default function DashboardPage({ orders, pickupTime, onStartPacking, onViewOrders, onOpenOrder }) {
  const pending = orders.filter((order) => order.status === 'pending');
  const active = orders.filter((order) => order.status !== 'cancelled');

  const revenue = DAILY_SALES.reduce((sum, day) => sum + day.amount, 0);
  const change = Math.round(((revenue - PREVIOUS_PERIOD_TOTAL) / PREVIOUS_PERIOD_TOTAL) * 100);
  const averageOrder = active.reduce((sum, order) => sum + orderTotal(order), 0) / Math.max(active.length, 1);
  const plantsSold = active.reduce((sum, order) => sum + orderItemCount(order), 0);
  const cancelled = orders.length - active.length;

  return (
    <>
      <PackingHero
        today={TODAY}
        pickupTime={pickupTime}
        pendingOrders={pending}
        onStartPacking={onStartPacking}
        onViewOrders={onViewOrders}
      />

      <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <StatCard
          label="Sales, last 14 days"
          value={formatMoney(revenue, { rounded: true })}
          note={`${change >= 0 ? 'Up' : 'Down'} ${Math.abs(change)}% on the 14 days before`}
          positive={change >= 0}
        />
        <StatCard label="Orders" value={orders.length} note={`${cancelled} cancelled`} />
        <StatCard label="Average order" value={formatMoney(averageOrder)} note="Excludes cancelled orders" />
        <StatCard label="Plants sold" value={plantsSold} note="Across all active orders" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <SalesChart data={DAILY_SALES} className="xl:col-span-2" />
        <PackingQueue orders={pending} onOpenOrder={onOpenOrder} onViewAll={onStartPacking} />
        <TopPlants orders={orders} className="xl:col-span-2" />
        <LowStock />
      </div>
    </>
  );
}
