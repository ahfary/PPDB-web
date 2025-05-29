"use client";

import Sidebar from "@/app/components/sidebar";
import { useEffect, useState } from "react";

interface Hasil {
  studentName: string;
  matematika: number;
  bahasaInggris: number;
  agama: number;
  psikolog: number;
  rataRata: number;
  status: string;
}

export default function HasilPage() {
  const [data, setData] = useState<Hasil[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/hasil-test");
      const json = await res.json();
      setData(json);
    };
    fetchData();
  }, []);

  console.log("Data hasil test:", data);

  return (
    <div className="text-black flex bg-white">
      <Sidebar />
      <div className="flex-1 p-8">
        <h2 className="text-xl font-bold mb-4">Hasil Test</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Nama Siswa</th>
                <th className="border px-4 py-2">Matematika</th>
                <th className="border px-4 py-2">Bahasa Inggris</th>
                <th className="border px-4 py-2">Agama</th>
                <th className="border px-4 py-2">Psikolog</th>
                <th className="border px-4 py-2">Rata-rata</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx}>
                  <td className="border px-4 py-2">{item.studentName}</td>
                  <td className="border px-4 py-2">{item.matematika || 0}</td>
                  <td className="border px-4 py-2">{item.inggris || 0}</td>
                  <td className="border px-4 py-2">{item.agama || 0}</td>
                  <td className="border px-4 py-2">{item.psikolog || 0}</td>
                  <td className="border px-4 py-2 font-bold">
                    {item.rataRata}
                  </td>
                  <td
                    className={`border px-4 py-2 font-bold ${
                      item.status === "Lulus"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
