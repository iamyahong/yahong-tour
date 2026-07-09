"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/admin", label: "대시보드", icon: "📊" },
  { href: "/admin/reservations", label: "예약 관리", icon: "📋" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <aside className="w-52 bg-gray-900 text-gray-100 flex flex-col shrink-0">
      {/* 로고 */}
      <div className="px-5 py-5 border-b border-gray-700">
        <p className="text-xs tracking-widest text-gray-400 uppercase">yahong tour</p>
        <p className="text-sm font-semibold text-white mt-0.5">관리자</p>
      </div>

      {/* 네비게이션 */}
      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : (pathname ?? "").startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* 로그아웃 */}
      <div className="border-t border-gray-700 p-4">
        <button
          onClick={handleLogout}
          className="w-full text-left text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-3 px-1 py-1"
        >
          <span>🚪</span> 로그아웃
        </button>
      </div>
    </aside>
  );
}
