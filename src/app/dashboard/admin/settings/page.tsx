"use client";
import Sidebar from "@/app/components/sidebar";
import { useState, useEffect, SetStateAction } from "react";

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
      <div className="p-8 space-y-4">
        <h1 className="text-2xl font-bold">Settings</h1>
        <div className="space-y-2">
          <label className="block">
            <span className="text-gray-700">Theme</span>
            <select
              value={theme}
              onChange={handleThemeChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </div>

        <div className="space-y-2">
          <label className="block">
            <span className="text-gray-700">Font</span>
            <select
              value={font}
              onChange={handleFontChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="sans-serif">Sans-serif</option>
              <option value="serif">Serif</option>
              <option value="monospace">Monospace</option>
            </select>
          </label>
        </div>

        <button
          onClick={handleSaveChanges}
          className="btn btn-info"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
