"use client";

import Sidebar from "@/app/components/sidebar";
import { useRouter } from "next/navigation";

const mapelList = [
  {
    id: "matematika",
    name: "Matematika",
    desc: "ilmu yang mempelajari angka, struktur, hubungan, dan operasi, serta bentuk-bentuk dalam ruang dan struktur serta pengukurannya. Matematika membantu memahami dunia di sekitar kita dan cara kerjanya, serta mengembangkan kemampuan berpikir logis, analisis, sistematis, kritis, dan kreatif. ",
  },
  {
    id: "psikolog",
    name: "Psikologi",
    desc: "mata pelajaran yang mempelajari tentang perilaku dan proses mental manusia. Psikologi adalah ilmu pengetahuan yang mempelajari pikiran, emosi, dan perilaku manusia, serta faktor-faktor yang mempengaruhinya. ",
  },
  {
    id: "bahasa-inggris",
    name: "Bahasa Inggris",
    desc: "Mata pelajaran yang mengajarkan keterampilan berbahasa Inggris, meliputi mendengarkan, berbicara, membaca, dan menulis.",
  },
  {
    id: "agama",
    name: "Agama",
    desc: "pelajaran yang berkaitan dengan agama Islam, yang umumnya diajarkan di Madrasah Diniyah atau Madrasah Diniyah Takmiliyah. Materi pelajaran meliputi ilmu Al-Qur'an, Hadits, Aqidah, Akhlak, Fiqih, Sejarah Islam, Bahasa Arab, dan praktik ibadah. ",
  },
];

export default function TestPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen bg-gray-100 text-black">
      <Sidebar />

      <main className="p-8 w-5/6">
      <h1 className="text-2xl font-bold mb-6">
        Soal Ujian
      </h1>
        <div className="grid grid-cols-2 gap-8 overflow-y-auto h-9/10">
          {mapelList.map((mapel) => (
            <div
              key={mapel.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col"
            >
              {/* Placeholder Gambar */}
              <div className="bg-gray-300 h-56 rounded mb-4"></div>

              {/* Nama dan Deskripsi */}
              <h2 className="text-lg font-bold">{mapel.name}</h2>
              <p className="text-sm text-gray-600 mb-4">{mapel.desc}</p>

              {/* Tombol Aksi */}
              <div className="mt-auto flex gap-2">
                <button
                  onClick={() =>
                    router.push(`/dashboard/admin/test/${mapel.id}`)
                  }
                  className="flex-1 btn bg-[#278550] border-none text-white"
                >
                  Lihat Soal
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
