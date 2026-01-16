"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Receipt,
  Wallet,
  Store,
  ScanLine,
  PlusCircle,
  User,
} from "lucide-react";

import { transactions } from "@/data/transactions";
import Table from "@/components/Table";
import { formatRupiah } from "@/utils/format";
import StatCard from "@/components/Statcard";

export default function KasirPage() {
  const today = "2026-01-16";

  const [branch, setBranch] = useState("Semua");
  const [cashier, setCashier] = useState("Semua");

  /* ===== realtime time ===== */
  const now = new Date().toLocaleString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  /* ===== transaksi hari ini ===== */
  const todayTransactions = transactions.filter(
    (t) => t.date === today
  );

  const filtered = todayTransactions.filter((t) => {
    if (branch !== "Semua" && t.branch !== branch) return false;
    if (cashier !== "Semua" && t.cashier !== cashier) return false;
    return true;
  });

  /* ===== statistik ===== */
  const totalOmzet = filtered.reduce(
    (sum, t) => sum + t.total,
    0
  );

  const activeBranches = new Set(
    filtered.map((t) => t.branch)
  ).size;

  /* ===== dropdown ===== */
  const branches = useMemo(
    () => ["Semua", ...new Set(transactions.map((t) => t.branch))],
    []
  );

  const cashiers = useMemo(
    () => ["Semua", ...new Set(transactions.map((t) => t.cashier))],
    []
  );

  /* ===== insight ===== */
  const topCashier =
    filtered.length > 0
      ? filtered.reduce((a, b) =>
          a.total > b.total ? a : b
        ).cashier
      : "-";

  /* ===== demo actions ===== */
  const handleScan = () => {
    alert(
      "📷 Scan berhasil!\n\nSimulasi:\n- Produk terjual\n- Stok berkurang\n- Transaksi tercatat"
    );
  };

  const handleNewTransaction = () => {
    alert("➕ Transaksi baru (demo)");
  };

  return (
    <div className="space-y-6">
      {/* ===== Header ===== */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-start"
      >
        <div>
          <h1 className="text-2xl font-bold">
            Kasir Hari Ini 🧾
          </h1>
          <p className="text-gray-500">
            Aktivitas penjualan per cabang & kasir
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {now}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleScan}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:opacity-90"
          >
            <ScanLine size={18} />
            Scan
          </button>

          <button
            onClick={handleNewTransaction}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:opacity-90"
          >
            <PlusCircle size={18} />
            Transaksi
          </button>
        </div>
      </motion.div>

      {/* ===== Filter ===== */}
      <motion.div layout className="flex flex-wrap gap-3">
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm bg-white"
        >
          {branches.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>

        <select
          value={cashier}
          onChange={(e) => setCashier(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm bg-white"
        >
          {cashiers.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </motion.div>

      {/* ===== Stat Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Transaksi"
          value={filtered.length.toString()}
          icon={<Receipt size={22} />}
          color="blue"
        />
        <StatCard
          title="Total Omzet"
          value={formatRupiah(totalOmzet)}
          icon={<Wallet size={22} />}
          color="green"
        />
        <StatCard
          title="Cabang Aktif"
          value={activeBranches.toString()}
          icon={<Store size={22} />}
          color="purple"
        />
      </div>

      {/* ===== Insight ===== */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-blue-100
                   border border-blue-200 rounded-xl p-4
                   flex items-center gap-3 text-sm text-blue-900"
      >
        <User size={18} />
        Kasir paling aktif hari ini:
        <span className="font-semibold">
          {topCashier}
        </span>
      </motion.div>

      {/* ===== Table ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow p-6"
      >
        <h2 className="font-semibold text-lg mb-4">
          Detail Transaksi Hari Ini
        </h2>

        {filtered.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            😴 Belum ada transaksi untuk filter ini
          </div>
        ) : (
          <Table
            columns={[
              { key: "no", label: "No" },
              { key: "branch", label: "Cabang" },
              { key: "cashier", label: "Kasir" },
              { key: "product", label: "Produk" },
              { key: "qty", label: "Qty" },
              { key: "total", label: "Total" },
            ]}
            data={filtered.map((t, i) => ({
              no: i + 1,
              branch: (
                <span className="px-2 py-1 text-xs rounded bg-gray-100">
                  {t.branch}
                </span>
              ),
              cashier: (
                <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                  {t.cashier}
                </span>
              ),
              product: t.product,
              qty: t.qty,
              total: formatRupiah(t.total),
            }))}
          />
        )}
      </motion.div>
    </div>
  );
}
