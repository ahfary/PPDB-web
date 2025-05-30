"use client";
import Sidebar from "@/app/components/sidebar";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

// Example language options
const languages = [
  { code: "id", label: "Bahasa Indonesia" },
  { code: "en", label: "English" },
];

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [font, setFont] = useState("sans-serif");
  const [language, setLanguage] = useState("id");

  // Handle font change
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

  // Handle language change
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    localStorage.setItem("language", selectedLang);

    // Optionally, trigger a reload or context update here if using i18n
    // window.location.reload(); // Uncomment if you want to reload the page
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
    const savedLang = localStorage.getItem("language");
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">Pengaturan</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 space-y-8">
          <div>
            <label className="block mb-2 text-gray-700 dark:text-gray-200 font-medium">Tema</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100"
            >
              <option value="light">Terang</option>
              <option value="dark">Gelap</option>
              <option value="system">Sesuai Sistem</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-gray-700 dark:text-gray-200 font-medium">Font</label>
            <select
              value={font}
              onChange={handleFontChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100"
            >
              <option value="sans-serif">Sans</option>
              <option value="serif">Serif</option>
              <option value="mono">Mono</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-gray-700 dark:text-gray-200 font-medium">Bahasa</label>
            <select
              value={language}
              onChange={handleLanguageChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.label}</option>
              ))}
            </select>
          </div>
        </div>
      </main>
    </div>
  );
}
