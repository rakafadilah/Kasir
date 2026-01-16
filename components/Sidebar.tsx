"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  BarChart3,
} from "lucide-react";

const menus = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Kasir",
    href: "/dashboard/kasir",
    icon: ShoppingCart,
  },
  {
    label: "Produk",
    href: "/dashboard/produk",
    icon: Package,
  },
  {
    label: "Laporan",
    href: "/dashboard/laporan",
    icon: BarChart3,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white h-screen sticky top-0">
      {/* ===== Logo ===== */}
      <div className="h-16 flex items-center px-6 text-xl font-bold border-b border-white/10">
        Kasir<span className="text-blue-500">App</span>
      </div>

      {/* ===== Menu ===== */}
      <nav className="p-4 space-y-1">
        {menus.map((menu) => {
          const active = pathname === menu.href;
          const Icon = menu.icon;

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`
                group flex items-center gap-3 px-4 py-2.5 rounded-lg
                transition-all duration-200
                ${
                  active
                    ? "bg-blue-600 shadow text-white"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              <Icon
                size={20}
                className={`
                  transition
                  ${
                    active
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  }
                `}
              />
              <span className="text-sm font-medium">
                {menu.label}
              </span>

              {/* Active indicator */}
              {active && (
                <span className="ml-auto h-2 w-2 rounded-full bg-white" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ===== Footer ===== */}
      <div className="absolute bottom-4 w-full px-4 text-xs text-gray-400">
        © 2026 KasirApp
      </div>
    </aside>
  );
}
