"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, User } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* ===== close when click outside ===== */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () =>
      document.removeEventListener("mousedown", handleClick);
  }, []);

const handleLogout = () => {
  localStorage.removeItem("token"); // optional
  window.location.href = "/login";
};


  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left */}
      <h1 className="font-semibold text-lg"></h1>

      {/* Right */}
      <div
        ref={ref}
        className="relative flex items-center gap-3"
      >
        <span className="text-sm text-gray-600 hidden sm:block">
          Admin
        </span>

        {/* Avatar */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-9 h-9 rounded-full bg-gradient-to-br
                     from-blue-500 to-indigo-500
                     text-white flex items-center
                     justify-center text-sm font-semibold
                     shadow hover:opacity-90 transition"
        >
          A
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-12 w-48
                         bg-white border rounded-xl shadow-lg
                         overflow-hidden"
            >
              <div className="px-4 py-3 border-b">
                <p className="text-sm font-medium">
                  Admin
                </p>
                <p className="text-xs text-gray-500">
                  Administrator
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2
                           px-4 py-2 text-sm text-red-600
                           hover:bg-red-50 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
