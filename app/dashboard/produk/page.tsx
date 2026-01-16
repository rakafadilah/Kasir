"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  AlertTriangle,
  XCircle,
  Store,
  Plus,
  Trash2,
  ScanLine,
} from "lucide-react";

import { products as initialProducts } from "@/data/products";
import Table from "@/components/Table";
import { formatRupiah } from "@/utils/format";
import StatCard from "@/components/Statcard";

export default function ProdukPage() {
  const [branch, setBranch] = useState("Semua");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(initialProducts);

  /* =======================
     CABANG
  ======================= */
  const branches = useMemo(() => {
    const all = products.flatMap((p) =>
      p.stocks.map((s) => s.branch)
    );
    return ["Semua", ...Array.from(new Set(all))];
  }, [products]);

  /* =======================
     FILTER
  ======================= */
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchBranch =
        branch === "Semua" ||
        p.stocks.some((s) => s.branch === branch);

      return matchSearch && matchBranch;
    });
  }, [products, search, branch]);

  /* =======================
     HITUNG STOK
  ======================= */
  const computedProducts = filteredProducts.map((p) => {
    const stocks =
      branch === "Semua"
        ? p.stocks
        : p.stocks.filter((s) => s.branch === branch);

    const totalStock = stocks.reduce(
      (sum, s) => sum + s.stock,
      0
    );

    return { ...p, stocks, totalStock };
  });

  /* =======================
     STAT
  ======================= */
  const stokHabis = computedProducts.filter(
    (p) => p.totalStock === 0
  ).length;

  const stokMenipis = computedProducts.filter(
    (p) => p.totalStock > 0 && p.totalStock <= 3
  ).length;

  /* =======================
     ACTIONS (DEMO)
  ======================= */
  const handleDelete = (id: number) => {
    if (!confirm("Yakin hapus produk ini?")) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleScan = () => {
    alert(
      "📷 Scan berhasil!\n\nSimulasi:\n- Produk terjual\n- Stok berkurang\n- Transaksi tercatat"
    );
  };

  const handleAddDummy = () => {
    setProducts((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "Produk Baru (Demo)",
        category: "HP",
        price: 999000,
        sold: 0,
        stocks: [
          { branch: "Toko A", stock: 5 },
          { branch: "Toko B", stock: 3 },
          { branch: "Toko C", stock: 0 },
        ],
      },
    ]);
  };

  /* =======================
     RENDER
  ======================= */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Stok Produk Multi Cabang 📦
          </h1>
          <p className="text-gray-500">
            Pantau stok semua toko dalam satu layar
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleScan}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg"
          >
            <ScanLine size={18} />
            Scan Barang
          </button>

          <button
            onClick={handleAddDummy}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            <Plus size={18} />
            Tambah Produk
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3">
        <input
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-lg w-64"
        />

        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        >
          {branches.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Produk" value={`${computedProducts.length}`} icon={<Package />} color="blue" />
        <StatCard title="Stok Menipis" value={`${stokMenipis}`} icon={<AlertTriangle />} color="yellow" />
        <StatCard title="Stok Habis" value={`${stokHabis}`} icon={<XCircle />} color="red" />
        <StatCard title="Cabang Aktif" value={`${branches.length - 1}`} icon={<Store />} color="purple" />
      </div>

      {/* Table */}
      <motion.div className="bg-white rounded-xl shadow p-6">
        <Table
          columns={[
            { key: "no", label: "No" },
            { key: "name", label: "Produk" },
            { key: "price", label: "Harga" },
            { key: "stock", label: "Total Stok" },
            { key: "branchStock", label: "Stok per Cabang" }, // 🔥 BARU
            { key: "aksi", label: "Aksi" },
          ]}
          data={computedProducts.map((p, i) => ({
            no: i + 1,
            name: p.name,
            price: formatRupiah(p.price),
            stock: p.totalStock,

            /* ==== STOK PER CABANG ==== */
            branchStock: (
              <div className="flex flex-wrap gap-1">
                {p.stocks.map((s) => (
                  <span
                    key={s.branch}
                    className={`px-2 py-1 text-xs rounded
                      ${
                        s.stock === 0
                          ? "bg-red-100 text-red-700"
                          : s.stock <= 3
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                  >
                    {s.branch}: {s.stock}
                  </span>
                ))}
              </div>
            ),

            aksi: (
              <button
                onClick={() => handleDelete(p.id)}
                className="text-red-600 hover:underline flex items-center gap-1"
              >
                <Trash2 size={14} />
                Hapus
              </button>
            ),
          }))}
        />
      </motion.div>
    </div>
  );
}
