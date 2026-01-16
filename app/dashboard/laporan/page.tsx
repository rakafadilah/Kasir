"use client";

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
  DollarSign,
  ShoppingCart,
  TrendingUp,
  QrCode,
  Banknote,
  Landmark,
} from "lucide-react";

import { transactions } from "@/data/transactions";
import Table from "@/components/Table";
import { formatRupiah } from "@/utils/format";
import StatCard from "@/components/Statcard";

/* =======================
   DATA DUMMY GRAFIK
======================= */
const omzetHarian = [
  { date: "12 Jan", omzet: 8500000 },
  { date: "13 Jan", omzet: 12500000 },
  { date: "14 Jan", omzet: 9800000 },
  { date: "15 Jan", omzet: 14300000 },
  { date: "16 Jan", omzet: 16500000 },
];

export default function LaporanPage() {
  /* =======================
     RINGKASAN UTAMA
  ======================= */
  const totalTransaksi = transactions.length;
  const totalOmzet = transactions.reduce((sum, t) => sum + t.total, 0);

  /* =======================
     METODE PEMBAYARAN
  ======================= */
  const paymentSummary = transactions.reduce<
    Record<string, number>
  >((acc, t) => {
    acc[t.payment] = (acc[t.payment] || 0) + t.total;
    return acc;
  }, {});

  /* =======================
     REKAP PER CABANG
  ======================= */
  const rekapCabang = Object.values(
    transactions.reduce<Record<string, any>>((acc, t) => {
      if (!acc[t.branch]) {
        acc[t.branch] = {
          branch: t.branch,
          transaksi: 0,
          omzet: 0,
        };
      }
      acc[t.branch].transaksi += 1;
      acc[t.branch].omzet += t.total;
      return acc;
    }, {})
  );

  return (
    <div className="space-y-6">
      {/* ===== Header ===== */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold">Laporan Penjualan 📊</h1>
        <p className="text-gray-500">
          Ringkasan omzet, metode pembayaran & performa cabang
        </p>
      </motion.div>

      {/* ===== Stat Utama ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Transaksi"
          value={totalTransaksi.toString()}
          icon={<ShoppingCart size={22} />}
          color="blue"
        />
        <StatCard
          title="Total Omzet"
          value={formatRupiah(totalOmzet)}
          icon={<DollarSign size={22} />}
          color="green"
        />
        <StatCard
          title="Rata-rata / Hari"
          value={formatRupiah(Math.floor(totalOmzet / 5))}
          icon={<TrendingUp size={22} />}
          color="purple"
        />
      </div>

      {/* ===== Metode Pembayaran ===== */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <StatCard
          title="QRIS"
          value={formatRupiah(paymentSummary.QRIS || 0)}
          icon={<QrCode size={22} />}
          color="green"
        />
        <StatCard
          title="Cash"
          value={formatRupiah(paymentSummary.CASH || 0)}
          icon={<Banknote size={22} />}
          color="yellow"
        />
        <StatCard
          title="Transfer Bank"
          value={formatRupiah(paymentSummary.BANK || 0)}
          icon={<Landmark size={22} />}
          color="blue"
        />
      </motion.div>

      {/* ===== Grafik Omzet ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow p-6"
      >
        <h2 className="font-semibold text-lg mb-1">
          Grafik Omzet Harian
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Tren pemasukan 5 hari terakhir
        </p>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={omzetHarian}>
              <XAxis dataKey="date" />
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

      {/* ===== Rekap Cabang ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow p-6"
      >
        <h2 className="font-semibold text-lg mb-4">
          Rekap Omzet per Cabang
        </h2>

        <Table
          columns={[
            { key: "no", label: "No" },
            { key: "branch", label: "Cabang" },
            { key: "transaksi", label: "Total Transaksi" },
            { key: "omzet", label: "Total Omzet" },
          ]}
          data={rekapCabang.map((c, i) => ({
            no: i + 1,
            branch: (
              <span className="px-2 py-1 text-xs rounded bg-gray-100">
                {c.branch}
              </span>
            ),
            transaksi: c.transaksi,
            omzet: formatRupiah(c.omzet),
          }))}
        />
      </motion.div>
    </div>
  );
}
