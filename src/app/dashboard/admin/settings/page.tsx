"use client";
import Sidebar from "@/app/components/sidebar";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [font, setFont] = useState("sans-serif");

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFont = e.target.value;
    setFont(selectedFont);

    document.documentElement.classList.remove("font-sans", "font-serif", "font-mono");
    document.documentElement.classList.add(
      selectedFont === "serif" ? "font-serif" :
      selectedFont === "mono" ? "font-mono" : "font-sans"
    );

    localStorage.setItem("font", selectedFont);
  };

  useEffect(() => {
    const savedFont = localStorage.getItem("font");
    if (savedFont) {
      setFont(savedFont);
      document.documentElement.classList.add(
        savedFont === "serif" ? "font-serif" :
        savedFont === "mono" ? "font-mono" : "font-sans"
      );
    }
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Pengaturan</h1>

        <label className="block mb-2">Tema:</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="mb-4 p-2 border"
        >
          <option value="light">Terang</option>
          <option value="dark">Gelap</option>
          <option value="system">Sesuai Sistem</option>
        </select>

        <label className="block mb-2">Font:</label>
        <select
          value={font}
          onChange={handleFontChange}
          className="mb-4 p-2 border"
        >
          <option value="sans-serif">Sans</option>
          <option value="serif">Serif</option>
          <option value="mono">Mono</option>
        </select>
      </main>
    </div>
  );
}
