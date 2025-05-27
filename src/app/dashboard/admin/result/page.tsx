'use client';

import Sidebar from "@/app/components/sidebar";
import { useState } from "react";
import dummyResults from "@/app/dummy/dataTest.json";

interface StudentResult {
  id: number;
  studentName: string;
  scores: {
    matematika: number;
    inggris: number;
    agama: number;
    psikolog: number;
  };
  date: string;
}

export default function HasilTestPage() {
  const [results] = useState<StudentResult[]>(dummyResults);

  // Helper untuk menghitung rata-rata dari 3 mapel
  const calculateAverage = (scores: StudentResult["scores"]) => {
    return Math.round(
      (scores.matematika + scores.inggris + scores.agama) / 3
    );
  };

  return (
    <div className="flex bg-gray-100 min-h-screen text-black dark:bg-[#242F59] dark:text-white">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Hasil Test</h1>

        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white border-gray-200 dark:bg-white/40">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Nama Siswa</th>
                <th className="py-3 px-4 text-left">Matematika</th>
                <th className="py-3 px-4 text-left">Bahasa Inggris</th>
                <th className="py-3 px-4 text-left">Agama</th>
                <th className="py-3 px-4 text-left">Psikolog</th>
                <th className="py-3 px-4 text-left">Rata-rata</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => {
                const average = calculateAverage(result.scores);
                const status = average >= 75 ? "Lulus" : "Tidak Lulus";

                return (
                  <tr key={result.id} className="border-t">
                    <td className="py-3 px-4">{result.studentName}</td>
                    <td className="py-3 px-4">{result.scores.matematika}</td>
                    <td className="py-3 px-4">{result.scores.inggris}</td>
                    <td className="py-3 px-4">{result.scores.agama}</td>
                    <td className="py-3 px-4">{result.scores.psikolog}</td>
                    <td className="py-3 px-4 font-semibold">{average}</td>
                    <td
                      className={`py-3 px-4 font-semibold ${
                        status === "Lulus" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {status}
                    </td>
                    <td className="py-3 px-4">{result.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
