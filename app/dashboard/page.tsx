"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Wallet,
  ShoppingCart,
  Package,
  Store,
  TrendingUp,
} from "lucide-react";

import Table from "@/components/Table";
import { formatRupiah } from "@/utils/format";
import StatCard from "@/components/Statcard";

/* =======================
   DATA DUMMY
======================= */

const dataHarian = [
  { name: "Sen", omzet: 1200000 },
  { name: "Sel", omzet: 2200000 },
  { name: "Rab", omzet: 1800000 },
  { name: "Kam", omzet: 2600000 },
  { name: "Jum", omzet: 3200000 },
  { name: "Sab", omzet: 4100000 },
  { name: "Min", omzet: 2800000 },
];

const produkTerjual = [
  {
    date: "2026-01-16",
    name: "iPhone 13",
    qty: 5,
    total: 60000000,
    branch: "Toko A",
  },
  {
    date: "2026-01-16",
    name: "Samsung A54",
    qty: 3,
    total: 16500000,
    branch: "Toko B",
  },
  {
    date: "2026-01-16",
    name: "Charger USB-C",
    qty: 12,
    total: 1800000,
    branch: "Toko A",
  },
];

export default function DashboardPage() {
  const [range, setRange] = useState("harian");

  /* =======================
     RINGKASAN OMZET CABANG
  ======================= */
  const omzetPerCabang = produkTerjual.reduce<
    Record<string, number>
  >((acc, p) => {
    acc[p.branch] = (acc[p.branch] || 0) + p.total;
    return acc;
  }, {});

  const topCabang = Object.entries(omzetPerCabang).sort(
    (a, b) => b[1] - a[1]
  )[0];

  return (
    <div className="space-y-6">
      {/* ===== Header ===== */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold">
          Dashboard Ringkasan 📊
        </h1>
        <p className="text-gray-500">
          Gambaran cepat performa bisnis hari ini
        </p>
      </motion.div>

      {/* ===== Stat Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Transaksi"
          value="128"
          icon={<ShoppingCart size={22} />}
          color="blue"
        />
        <StatCard
          title="Omzet Hari Ini"
          value={formatRupiah(8500000)}
          icon={<Wallet size={22} />}
          color="green"
        />
        <StatCard
          title="Produk Terjual"
          value="32 Item"
          icon={<Package size={22} />}
          color="purple"
        />
        <StatCard
          title="Cabang Aktif"
          value="3 Cabang"
          icon={<Store size={22} />}
          color="yellow"
        />
      </div>

      {/* ===== Insight Omzet ===== */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-50 to-green-100
                   border border-green-200 rounded-xl p-4
                   flex items-center gap-3 text-sm text-green-900"
      >
        <TrendingUp size={18} />
        Hari ini omzet paling besar berasal dari
        <span className="font-semibold">
          {topCabang?.[0]}
        </span>
        sebesar
        <span className="font-semibold">
          {formatRupiah(topCabang?.[1] || 0)}
        </span>
      </motion.div>

      {/* ===== Chart ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="font-semibold text-lg">
              Tren Omzet
            </h2>
            <p className="text-sm text-gray-500">
              Pergerakan omzet berdasarkan waktu
            </p>
          </div>

          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="border rounded-lg px-3 py-1 text-sm"
          >
            <option value="harian">Harian</option>
            <option value="mingguan">Mingguan</option>
            <option value="bulanan">Bulanan</option>
            <option value="tahunan">Tahunan</option>
          </select>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataHarian}>
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(v) => `${v / 1000000}jt`} />
              <Tooltip
                formatter={(value) =>
                  typeof value === "number"
                    ? formatRupiah(value)
                    : value
                }
              />
              <Line
                type="monotone"
                dataKey="omzet"
                stroke="#16a34a"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* ===== Snapshot Produk Terjual ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">
            Produk Terjual Hari Ini
          </h2>
          <span className="text-xs text-gray-400">
            *Detail lengkap lihat menu Kasir / Laporan
          </span>
        </div>

        <Table
          columns={[
            { key: "no", label: "No" },
            { key: "date", label: "Tanggal" },
            { key: "name", label: "Produk" },
            { key: "branch", label: "Cabang" },
            { key: "qty", label: "Qty" },
            { key: "total", label: "Total" },
          ]}
          data={produkTerjual.map((p, i) => ({
            no: i + 1,
            date: new Date(p.date).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "short",
            }),
            name: p.name,
            branch: (
              <span className="px-2 py-1 text-xs rounded bg-gray-100">
                {p.branch}
              </span>
            ),
            qty: p.qty,
            total: formatRupiah(p.total),
          }))}
        />
      </motion.div>
    </div>
  );
}
