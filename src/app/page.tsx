"use client";

import Image from "next/image";

export default function Home() {
  return (
    <main className="font-sans text-gray-800">
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed top-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" className="h-10" />
            <h1 className="text-lg font-bold">SMK MADINATULQURAN</h1>
          </div>
          <ul className="flex space-x-6">
            <li>
              <a href="#home" className="hover:text-green-600 font-medium">
                Home
              </a>
            </li>
            <li>
              <a href="#tentang" className="hover:text-green-600 font-medium">
                Tentang
              </a>
            </li>
            <li>
              <a href="#kurikulum" className="hover:text-green-600 font-medium">
                Kurikulum
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-green-600 font-medium">
                About Us
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="pt-32 pb-20 bg-gradient-to-br from-green-100 to-white text-center"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
            SMK MADINATULQURAN <br /> Boarding School
          </h1>
          <p className="text-gray-700 mb-8">
            EDC menyediakan berbagai kelas industri untuk membantu perkembangan
            yang kamu inginkan
          </p>

          {/* Gambar Bulat */}
          <div className="flex justify-center space-x-4 mb-6">
            <img src="/assets/group1.png" alt="photos" />
          </div>
        </div>
      </section>

      {/* Mitra / Kolaborasi */}
      <section className="py-10 bg-white">
        <div className="flex flex-wrap justify-center items-center gap-6 px-4 max-w-5xl mx-auto">
          <img src="/assets/collab.png" className="h-12" alt="Mikrotik" />
          <img src="/assets/mikrotik.png" className="h-12" alt="LSP" />
          <img src="/assets/lsp.png" className="h-12" alt="lsp" />
          <img src="/assets/pens.png" className="h-12" alt="pens" />
          <img src="/assets/anabuki.png" className="h-12" alt="anabuki" />
        </div>
      </section>

      {/* Visi */}
      <section className="py-16 bg-gray-50 text-center flex items-center">
        <div className="mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-green-700">
            SMK MQ mencetak tenaga ahli siap bersaing di industri
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 mb-6">
            SMK MQ siap membimbing dari nol hingga ahli dengan metode belajar
            terbaik, kelas yang bisa diulang, dan peluang kerja terjamin.
          </p>
        </div>
        <div>
          <img src="/assets/group2.png" alt="photos" className="h-80" />
        </div>
      </section>

      {/* Diniyah & Umum */}
      <section id="kurikulum" className="py-10 bg-white text-center">
        <h3 className="text-xl font-bold text-green-700 mb-2">
          Diniyah & Umum
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Sebagai acuan dasar dalam penyelenggaraan Lembaga Pendidikan Sekolah,
          para santri juga dibekali pelajaran...
        </p>
      </section>

      {/* Keunggulan */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-10">
          Keunggulan Sekolah MQ
        </h2>
        <div className="grid md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
          {[
            "Ekstrakulikuler Menarik & Beragam",
            "Pesantren Berbasis IT",
            "Program Keahlian Sesuai Kebutuhan Industri",
            "Sertifikat Kompetensi",
            "Lingkungan Asri",
            "Dibimbing oleh Tenaga Pengajar Berpengalaman",
          ].map((title, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-md text-sm font-medium"
            >
              {title}
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-purple-100 to-blue-100 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Segera Daftarkan Putra Anda Sekarang
          </h3>
          <p className="mb-6 text-gray-700">
            InsyaAllah kami adalah jawaban ayah bunda yang ingin putranya
            belajar IT, tetapi tetap memprioritaskan diniyah sebagai bekal
            hidupnya.
          </p>
          <a
            href="#"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700"
          >
            Daftar Sekarang
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          <div>
            <img src="/logo.png" className="h-10 mb-2" />
            <p>SMK Madinatulquran Boarding School</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Kontak</h4>
            <p>0851 6288 2547 (Yusuf)</p>
            <p>0821 6920 4657 (Hisyam)</p>
            <p>info@smkmadinatulquran.sch.id</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Alamat</h4>
            <p>
              Ng. Kebon Kalapa, Jl. KH. R. Kosim RW01, Sindangsari, Kec. Sajira,
              Kab. Lebak, Banten
            </p>
            <p>NPSN: 69944476</p>
          </div>
        </div>
        <div className="text-center mt-8 text-sm">
          © 2025 SMK MQ. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
