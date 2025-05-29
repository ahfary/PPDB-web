'use client'

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Home, Users, User, Settings, Files, NotebookPen } from "lucide-react"
import Image from "next/image"

const menuItems = [
  { name: "Overview", icon: <Home className="w-5 h-5" />, href: "/dashboard/admin" },
  { name: "Siswa", icon: <Users className="w-5 h-5" />, href: "/dashboard/admin/users" },
  { name: "Soal Ujian", icon: <NotebookPen className="w-5 h-5" />, href: "/dashboard/admin/test" },
  { name: "Hasil Ujian", icon: <Files className="w-5 h-5" />, href: "/dashboard/admin/result" },
  { name: "Profil", icon: <User className="w-5 h-5" />, href: "/dashboard/admin/profile" },
  { name: "Pengaturan", icon: <Settings className="w-5 h-5" />, href: "/dashboard/admin/settings" },
];

const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/auth/login') // redirect ke halaman login
  }

  return (
    <aside className="w-64 h-screen bg-[#278550] flex flex-col justify-between text-white p-4 dark:bg-[#0F103F]">
      <div>
        <div className="text-2xl font-bold mb-10">
          <Image src={"/assets/SMKKN.png"} alt={"smk-kreatif-nusantara"} width={350} height={350} />
        </div>

        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-xl transition font-semibold ${
                  isActive ? "bg-[#41AD89] dark:bg-white/30 text-white" : "hover:bg-white/10 text-white"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="bg-[#50A663] dark:bg-info rounded-xl p-4 mt-6 text-sm space-y-2">
        <Image
          src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
          alt="promo"
          className="w-12 h-12 mx-auto"
          width={48}
          height={48}
        />
        <p className="text-center font-semibold">Mr Abqory</p>
        <button
          onClick={handleLogout}
          className="btn btn-block btn-success text-white mt-2 dark:btn-primary"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
