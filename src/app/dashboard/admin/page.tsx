"use client";
import { useState, useEffect } from "react";

import Sidebar from "@/app/components/sidebar";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Warna untuk PieChart
const COLORS = ["#50A663", "#278550"];

// Komponen Utama
export default function StatistikPage() {
  const [data, setData] = useState<any[]>([]);
  const [summaryData, setSummaryData] = useState({
    totalSiswa: 0,
    siswaLaki: 0,
    siswaPerempuan: 0,
    totalTes: 0,
    rataRataNilai: 0,
    jumlahLulus: 0,
    jumlahTidakLulus: 0,
  });

  
  // Data statis untuk visualisasi sementara
  const rataNilaiPerTes = [
    { tes: "Tes 1", nilai: 72 },
    { tes: "Tes 2", nilai: 75 },
    { tes: "Tes 3", nilai: 78 },
    { tes: "Tes 4", nilai: 74 },
    { tes: "Tes 5", nilai: 80 },
  ];
  
  const genderDistribusi = [
    { name: "laki-laki", value: summaryData.siswaLaki },
    { name: "perempuan", value: summaryData.siswaPerempuan },
  ];
  
  const nilaiPerGender = [
    { gender: "Laki-laki", rataRata: 87 },
    { gender: "Perempuan", rataRata: 50 },
  ];
  
  const distribusiNilai = [
    { range: "<60", jumlah: 10 },
    { range: "60–70", jumlah: 25 },
    { range: "70–80", jumlah: 40 },
    { range: "80–90", jumlah: 30 },
    { range: "90+", jumlah: 15 },
  ];
  
  const domisiliData = [
    { kota: "Jakarta", jumlah: 30 },
    { kota: "Bandung", jumlah: 20 },
    { kota: "Surabaya", jumlah: 15 },
    { kota: "Yogyakarta", jumlah: 10 },
    { kota: "Medan", jumlah: 8 },
    { kota: "Makassar", jumlah: 5 },
  ];
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/statistic");
      const result = await response.json();
      
      setData(result.dataSiswa);
      
      // Update summary berdasarkan field yang sesuai
      setSummaryData({
        totalSiswa: result.total,
        siswaLaki: result.berdasarkanJenisKelamin["laki-laki"] || 0,
        siswaPerempuan: result.berdasarkanJenisKelamin["Perempuan"] || 0,
        totalTes: 5, // misalnya ini statis dulu (karena tidak tersedia di API)
        rataRataNilai: 75.8, // ini juga contoh statis
        jumlahLulus: 1, // ganti sesuai logic kamu kalau sudah ada fieldnya
        jumlahTidakLulus: 1, // ganti sesuai logic kamu kalau sudah ada fieldnya
      });
    };
    
    fetchData();
  }, []);
  
  console.log(data)
  
  // console.log(summaryData.siswaLaki);
  return (
    <div className="flex bg-gray-100 min-h-screen text-black">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto h-screen">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Ringkasan */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          <StatCard label="Total Siswa" value={summaryData.totalSiswa} />
          <StatCard label="Siswa Laki-laki" value={summaryData.siswaLaki} />
          <StatCard
            label="Siswa Perempuan"
            value={summaryData.siswaPerempuan}
          />
          <StatCard label="Total Tes" value={summaryData.totalTes} />
          <StatCard
            label="Rata-rata Nilai"
            value={summaryData.rataRataNilai.toFixed(1)}
          />
          <StatCard
            label="Lulus / Tidak"
            value={`${summaryData.jumlahLulus} / ${summaryData.jumlahTidakLulus}`}
          />
        </div>

        {/* Grafik Gender & Nilai per Gender */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">
              Distribusi Jenis Kelamin
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genderDistribusi}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {genderDistribusi.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">
              Rata-rata Nilai per Gender
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={nilaiPerGender}>
                <XAxis dataKey="gender" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rataRata" fill="#00D390" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grafik Nilai per Tes */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="text-lg font-semibold mb-4">
            Rata-rata Nilai per Tes
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={rataNilaiPerTes}>
              <XAxis dataKey="tes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="nilai"
                stroke="#10b981"
                name="Rata-rata Nilai"
              />
              <CartesianGrid strokeDasharray="3 3" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Grafik Distribusi Nilai */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="text-lg font-semibold mb-4">Distribusi Nilai</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={distribusiNilai}>
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="jumlah" fill="#34d399" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Grafik Domisili */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Statistik Domisili</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={domisiliData}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="kota" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="jumlah" fill="#278550" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}

// Komponen kartu ringkasan
function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
