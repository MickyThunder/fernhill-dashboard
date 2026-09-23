export const PLANTS = [
  { id: 'monstera', name: 'Monstera deliciosa', price: 48, stock: 14 },
  { id: 'fiddle', name: 'Fiddle leaf fig', price: 65, stock: 7 },
  { id: 'snake', name: 'Snake plant', price: 32, stock: 22 },
  { id: 'pothos', name: "Pothos 'Marble Queen'", price: 22, stock: 31 },
  { id: 'calathea', name: 'Calathea orbifolia', price: 38, stock: 3 },
  { id: 'zz', name: 'ZZ plant', price: 35, stock: 18 },
  { id: 'pearls', name: 'String of pearls', price: 18, stock: 4 },
  { id: 'bird', name: 'Bird of paradise', price: 89, stock: 2 },
  { id: 'lily', name: 'Peace lily', price: 28, stock: 12 },
  { id: 'hoya', name: 'Hoya carnosa', price: 24, stock: 9 },
];

export const LOW_STOCK_THRESHOLD = 5;

export function getPlant(id) {
  return PLANTS.find((plant) => plant.id === id);
}
