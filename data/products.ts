export interface ProductStock {
  branch: string;
  stock: number;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  sold: number;
  stocks: ProductStock[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "iPhone 13",
    category: "HP",
    price: 12000000,
    sold: 18,
    stocks: [
      { branch: "Toko A", stock: 5 },
      { branch: "Toko B", stock: 0 },
      { branch: "Toko C", stock: 2 },
    ],
  },
  {
    id: 2,
    name: "iPhone 14",
    category: "HP",
    price: 14000000,
    sold: 10,
    stocks: [
      { branch: "Toko A", stock: 2 },
      { branch: "Toko B", stock: 1 },
      { branch: "Toko C", stock: 0 },
    ],
  },
  {
    id: 3,
    name: "Samsung A54",
    category: "HP",
    price: 5500000,
    sold: 25,
    stocks: [
      { branch: "Toko A", stock: 3 },
      { branch: "Toko B", stock: 6 },
    ],
  },
  {
    id: 4,
    name: "Samsung S23",
    category: "HP",
    price: 13500000,
    sold: 7,
    stocks: [
      { branch: "Toko A", stock: 1 },
      { branch: "Toko B", stock: 2 },
      { branch: "Toko C", stock: 1 },
    ],
  },
  {
    id: 5,
    name: "Xiaomi Redmi Note 12",
    category: "HP",
    price: 2800000,
    sold: 40,
    stocks: [
      { branch: "Toko A", stock: 8 },
      { branch: "Toko B", stock: 12 },
    ],
  },
  {
    id: 6,
    name: "Charger USB-C",
    category: "Aksesoris",
    price: 150000,
    sold: 80,
    stocks: [
      { branch: "Toko A", stock: 25 },
      { branch: "Toko B", stock: 0 },
      { branch: "Toko C", stock: 15 },
    ],
  },
  {
    id: 7,
    name: "Headset Bluetooth",
    category: "Aksesoris",
    price: 350000,
    sold: 60,
    stocks: [
      { branch: "Toko A", stock: 0 },
      { branch: "Toko B", stock: 4 },
      { branch: "Toko C", stock: 6 },
    ],
  },
  {
    id: 8,
    name: "Powerbank 20.000mAh",
    category: "Aksesoris",
    price: 450000,
    sold: 50,
    stocks: [
      { branch: "Toko A", stock: 2 },
      { branch: "Toko B", stock: 5 },
    ],
  },
  {
    id: 9,
    name: "Tempered Glass",
    category: "Aksesoris",
    price: 50000,
    sold: 120,
    stocks: [
      { branch: "Toko A", stock: 40 },
      { branch: "Toko B", stock: 60 },
      { branch: "Toko C", stock: 30 },
    ],
  },
  {
    id: 10,
    name: "Kabel Data USB-C",
    category: "Aksesoris",
    price: 75000,
    sold: 90,
    stocks: [
      { branch: "Toko A", stock: 20 },
      { branch: "Toko B", stock: 25 },
    ],
  },
];
