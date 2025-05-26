"use client";
import Sidebar from "@/app/components/sidebar";
import { useState, useEffect, SetStateAction } from "react";
import clsx from "clsx";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function Settings() {
  // State untuk menyimpan pengaturan font dan tema
  const [theme, setTheme] = useState("light");
  const [font, setFont] = useState("sans-serif");

  // Setel tema dan font berdasarkan perubahan user
  const handleThemeChange = (event: {
    target: { value: SetStateAction<string> };
  }) => setTheme(event.target.value);
  const handleFontChange = (event: {
    target: { value: SetStateAction<string> };
  }) => setFont(event.target.value);

  // Fungsi untuk menyimpan perubahan ke localStorage atau API
  const handleSaveChanges = () => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("font", font);

    document.documentElement.classList.toggle("dark", theme === "dark");

    // Hapus semua class font lama, lalu tambahkan yang baru
    document.documentElement.classList.remove(
      "font-sans",
      "font-serif",
      "font-mono"
    );
    document.documentElement.classList.add(
      font === "sans-serif"
        ? "font-sans"
        : font === "serif"
        ? "font-serif"
        : "font-mono"
    );
  };

  // Memuat pengaturan dari localStorage pada saat halaman dimuat
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedFont = localStorage.getItem("font");

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }

    if (savedFont) {
      setFont(savedFont);
      document.documentElement.classList.remove(
        "font-sans",
        "font-serif",
        "font-mono"
      );
      document.documentElement.classList.add(
        savedFont === "sans-serif"
          ? "font-sans"
          : savedFont === "serif"
          ? "font-serif"
          : "font-mono"
      );
    }
  }, []);

  return (
    <div className="flex bg-gray-100 text-black">
      <Sidebar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <div className="bg-white rounded-md shadow-md p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Theme
              </label>
              <select
                value={theme}
                onChange={handleThemeChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Font
              </label>
              <select
                value={font}
                onChange={handleFontChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="sans-serif">Sans-serif</option>
                <option value="serif">Serif</option>
                <option value="monospace">Monospace</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSaveChanges}
            className={clsx(
              "btn btn-jnfo border-none",
              "bg-blue-600 hover:bg-blue-700"
            )}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
