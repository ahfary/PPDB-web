'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, User, Settings } from "lucide-react";
import Image from "next/image";

const menuItems = [
  { name: "Dashboard", icon: <Home className="w-5 h-5" />, href: "/dashboard/admin" },
  { name: "Users", icon: <Users className="w-5 h-5" />, href: "/dashboard/admin/users" },
  { name: "Profile", icon: <User className="w-5 h-5" />, href: "/dashboard/admin/profile" },
  { name: "Settings", icon: <Settings className="w-5 h-5" />, href: "/dashboard/admin/settings" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-[#5B3CC4] flex flex-col justify-between text-white p-4">
      {/* Logo */}
      <div>
        <div className="text-2xl font-bold mb-10">PPDB WEB</div>

        {/* Menu */}
        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-xl transition font-semibold ${
                  isActive
                    ? "bg-white text-[#5B3CC4]"
                    : "hover:bg-white/20 text-white"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Promo Box */}
      <div className="bg-white/10 rounded-xl p-4 mt-6 text-sm space-y-2">
        <Image
          src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
          alt="promo"
          className="w-12 h-12 mx-auto"
          width={48}
          height={48}
        />
        <p className="text-center font-semibold">Mr Abqory</p>
        <button className="btn btn-block btn-secondary mt-2">Logout</button>
      </div>
    </aside>
  );
};

export default Sidebar;
