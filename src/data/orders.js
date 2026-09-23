import { PLANTS, getPlant } from './plants.js';

export const TODAY = '2026-09-24';

const CUSTOMERS = [
  ['Amara Osei', 'amara.osei@example.com', '14 Birch Lane, Portland, OR 97205'],
  ['Lucas Moreau', 'lucas.moreau@example.com', '220 Rue Saint-Denis, Montreal, QC H2X 3K4'],
  ['Priya Raman', 'priya.raman@example.com', '8 Linden Court, Austin, TX 78704'],
  ['Maximilian Featherstonehaugh', 'maximilian.featherstonehaugh@example.com', '1 Kensington Mews, London W8 5SE'],
  ['Sofia Lindqvist', 'sofia.l@example.com', 'Vasagatan 12, 111 20 Stockholm'],
  ['Daniel Kim', 'daniel.kim@example.com', '415 Pine Street, Seattle, WA 98101'],
  ['Hannah Adeyemi', 'hannah.adeyemi@example.com', '77 Canal Road, Leeds LS12 2PL'],
  ['Mateo Álvarez', 'mateo.alvarez@example.com', 'Calle de Alcalá 150, 28009 Madrid'],
  ['Grace Whitfield', 'grace.w@example.com', '9 Harbour View, Wellington 6011'],
  ['Yusuf Demir', 'yusuf.demir@example.com', '32 Elm Avenue, Chicago, IL 60614'],
  ['Chloé Bernard', 'chloe.bernard@example.com', '5 Place Bellecour, 69002 Lyon'],
  ['Tomás Novak', 'tomas.novak@example.com', 'Vinohradská 48, 120 00 Prague'],
  ['Aiko Tanaka', 'aiko.tanaka@example.com', '2-11 Jingumae, Shibuya, Tokyo 150-0001'],
  ['Oliver Grant', 'oliver.grant@example.com', '61 Maple Drive, Denver, CO 80206'],
  ['Fatima Zahra El Idrissi', 'fatima.elidrissi@example.com', '18 Boulevard Anfa, Casablanca 20250'],
  ['Noah Fischer', 'noah.fischer@example.com', 'Torstraße 101, 10119 Berlin'],
  ['Isabella Rossi', 'isabella.rossi@example.com', 'Via Tortona 27, 20144 Milan'],
  ['Ethan Brooks', 'ethan.brooks@example.com', '300 Ocean Ave, Santa Monica, CA 90402'],
  ['Mei Lin Chen', 'meilin.chen@example.com', '88 Queen Street West, Toronto, ON M5H 2M6'],
  ['Samuel Okafor', 'samuel.okafor@example.com', '12 Admiralty Way, Lagos 106104'],
  ['Emma Johansson', 'emma.johansson@example.com', 'Kungsgatan 3, 411 19 Gothenburg'],
  ['Ravi Patel', 'ravi.patel@example.com', '45 Garden Row, Edinburgh EH3 6LA'],
  ['Zoe Martin', 'zoe.martin@example.com', '19 Willow Street, Brooklyn, NY 11201'],
  ['Kofi Mensah', 'kofi.mensah@example.com', '7 Independence Ave, Accra GA-110'],
];

const STATUSES = [
  'pending', 'pending', 'pending', 'packed', 'pending', 'shipped',
  'pending', 'packed', 'shipped', 'cancelled', 'shipped', 'packed',
  'shipped', 'shipped', 'pending', 'shipped', 'cancelled', 'shipped',
  'shipped', 'shipped', 'shipped', 'shipped', 'shipped', 'shipped',
];

function itemsFor(index) {
  const first = PLANTS[index % PLANTS.length];
  const second = PLANTS[(index * 3 + 4) % PLANTS.length];
  const items = [{ plantId: first.id, qty: (index % 3) + 1 }];
  if (index % 2 === 0 && second.id !== first.id) {
    items.push({ plantId: second.id, qty: 1 });
  }
  return items;
}

function dateFor(index) {
  // Newest orders first, spread across the last 14 days.
  const day = 24 - Math.floor((index * 14) / CUSTOMERS.length);
  return `2026-09-${String(day).padStart(2, '0')}`;
}

export const INITIAL_ORDERS = CUSTOMERS.map(([name, email, address], index) => ({
  id: `FH-${1048 - index}`,
  customer: { name, email },
  address,
  date: dateFor(index),
  status: STATUSES[index],
  items: itemsFor(index),
}));

export function orderSubtotal(order) {
  return order.items.reduce((sum, item) => sum + getPlant(item.plantId).price * item.qty, 0);
}

export function orderShipping(order) {
  return orderSubtotal(order) >= 100 ? 0 : 9.5;
}

export function orderTotal(order) {
  return orderSubtotal(order) + orderShipping(order);
}

export function orderItemCount(order) {
  return order.items.reduce((sum, item) => sum + item.qty, 0);
}

export function orderSummary(order) {
  return order.items.map((item) => `${item.qty}× ${getPlant(item.plantId).name}`).join(', ');
}

export const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'packed', label: 'Packed' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'cancelled', label: 'Cancelled' },
];
