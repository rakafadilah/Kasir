"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (!username.trim()) return;
    localStorage.setItem("role", "admin");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* ================= LEFT BRAND ================= */}
      <div className="hidden md:flex flex-col justify-center px-14
                      bg-gradient-to-br from-zinc-900 via-indigo-900 to-blue-900
                      text-white">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold mb-4 tracking-tight">
            CMS Kasir
          </h1>
          <p className="text-lg text-blue-100 mb-6">
            Sistem kasir modern untuk
            <br />
            toko elektronik multi-cabang
          </p>

          <ul className="space-y-3 text-blue-100 text-sm">
            <li>📊 Dashboard real-time</li>
            <li>🏪 Multi cabang & kasir</li>
            <li>📦 Monitoring stok pintar</li>
            <li>💳 Laporan & metode pembayaran</li>
          </ul>
        </motion.div>
      </div>

      {/* ================= RIGHT LOGIN ================= */}
      <div className="flex items-center justify-center bg-zinc-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight">
              Welcome Back 👋
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Login untuk masuk ke CMS Kasir
            </p>
          </div>

          <div className="space-y-4">
            <input
              className="w-full rounded-lg border px-4 py-3 text-sm
                         focus:border-blue-600 focus:ring-2 focus:ring-blue-100
                         outline-none transition"
              placeholder="Username (demo)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <button
              onClick={handleLogin}
              className="w-full rounded-lg bg-gradient-to-r
                         from-blue-600 to-indigo-600
                         py-3 font-semibold text-white
                         transition hover:opacity-90"
            >
              Login Demo
            </button>
          </div>

          {/* DEMO INFO */}
          <div className="mt-6 rounded-lg bg-blue-50 border border-blue-100 p-3 text-sm text-blue-700">
            <p className="font-medium">Akun Demo</p>
            <p>Username bebas (Admin)</p>
          </div>

          <p className="mt-6 text-xs text-center text-gray-400">
            © 2026 CMS Kasir — Demo Interface
          </p>
        </motion.div>
      </div>
    </div>
  );
}
