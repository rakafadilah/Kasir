export interface Transaction {
  date: string;
  branch: string;
  cashier: string;
  product: string;
  qty: number;
  total: number;
  payment: "QRIS" | "CASH" | "BANK";
}

export const transactions: Transaction[] = [
  {
    date: "2026-01-16",
    branch: "Toko A",
    cashier: "Kasir A",
    product: "iPhone 13",
    qty: 1,
    total: 12000000,
    payment: "QRIS",
  },
  {
    date: "2026-01-16",
    branch: "Toko A",
    cashier: "Kasir B",
    product: "Charger USB-C",
    qty: 2,
    total: 300000,
    payment: "CASH",
  },
  {
    date: "2026-01-16",
    branch: "Toko B",
    cashier: "Kasir A",
    product: "Samsung A54",
    qty: 1,
    total: 5500000,
    payment: "BANK",
  },
  {
    date: "2026-01-15",
    branch: "Toko C",
    cashier: "Kasir C",
    product: "Powerbank",
    qty: 1,
    total: 450000,
    payment: "QRIS",
  },
];
