"use client";

import Sidebar from "@/app/components/sidebar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";

export default function BuatSoalPage() {
  const jumlahSoal = 25;
  const { mapel } = useParams();
  const [soal, setSoal] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSoal = async () => {
      try {
        const res = await fetch("/api/soal");
        const data = await res.json();

        // Filter soal sesuai mata pelajaran
        const filtered = data.filter((item: any) => item.mapel === mapel);
        setSoal(filtered);
        setLoading(false);
      } catch (error) {
        console.error("Gagal fetch soal:", error);
        console.log(soal)
      }
    };

    fetchSoal();
  }, [mapel, soal]);

  if (loading) return <p>Loading...</p>;
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-xl font-bold mb-6">BUAT SOAL</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Kiri: Form soal */}
          <div className="flex-1 overflow-y-auto h-screen pr-8">
            {[1, 2].map((nomor, index) => (
              <div
                key={index}
                className="flex bg-white shadow-md rounded-lg mb-6 overflow-hidden"
              >
                {/* Soal dan opsi */}
                <div className="flex-1 p-5">
                  <p className="mb-3 font-medium">
                    {nomor}. Pertanyaan soal nomor {nomor}...
                  </p>

                  <div className="space-y-2">
                    {["A", "B", "C", "D"].map((huruf, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`soal-${nomor}`}
                          className="radio radio-sm bg-gray-300"
                        />
                        <input
                          type="text"
                          placeholder={`Opsi ${huruf}`}
                          className="input input-bordered input-sm w-full bg-gray-100"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tombol aksi */}
                <div className="flex flex-col items-center bg-[#278550] px-2 py-4 text-white gap-3">
                  <button className="text-xs">
                    <FaPlus />
                  </button>
                  <button className="text-xs">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}

            {/* Tombol tambah soal */}
            <div className="flex justify-end mt-6">
              <button className="btn btn-success">Tambah Soal</button>
            </div>
          </div>

          {/* Kanan: Container nomor soal */}
          <div className="bg-white shadow-md rounded-lg p-8 w-1/3 h-fit">
            <div className="grid grid-cols-5 gap-6">
              {Array.from({ length: jumlahSoal }, (_, i) => (
                <button
                  key={i}
                  className="btn btn-lg bg-white border-1 text-md w-full text-black focus:bg-[#278550] focus:text-white"
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
