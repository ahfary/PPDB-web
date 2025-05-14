"use client";

import Image from "next/image";

export default function Home() {
  return (
    <main className="font-sans text-gray-800">
      {/* Navbar */}
      <nav className="navbar bg-white shadow-md fixed top-0 w-full z-50 px-32">
        <div className="flex items-center space-x-2 navbar-start">
          <img src="/assets/mq.jpg" alt="Logo" className="h-10" />
        </div>
        <ul className="flex space-x-6 navbar-center">
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
        <div className="navbar-end"></div>
      </nav>

      {/* Hero */}
      <section id="home" className="pt-32 pb-20 bg-gradient-to-br text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-7xl md:text-5xl font-bold text-green-700 mb-6">
            SMK MADINATULQURAN <br /> Boarding School
          </h1>
          <p className="text-gray-700 text-3xl mb-8">
            EDC menyediakan berbagai kelas industri untuk membantu perkembangan
            yang kamu inginkan
          </p>

          {/* Gambar Bulat */}
          <div className="flex justify-center space-x-4 mb-6">
            <img src="/assets/hero.png" alt="photos" />
          </div>
          <div>
            <img src="/assets/group1.png" alt="photos" className="mt-12" />
          </div>
        </div>
      </section>

      {/* Mitra / Kolaborasi */}
      <section className="py-10 bg-white py-24">
        <div className="flex flex-wrap justify-center items-center gap-6 px-4 max-w-5xl mx-auto">
          <img src="/assets/collab.png" className="h-12" alt="Mikrotik" />
          <img src="/assets/mikrotik.png" className="h-12" alt="LSP" />
          <img src="/assets/lsp.png" className="h-12" alt="lsp" />
          <img src="/assets/pens.png" className="h-12" alt="pens" />
          <img src="/assets/anabuki.png" className="h-12" alt="anabuki" />
        </div>
      </section>

      {/* Visi */}
      <section className="min-h-screen py-16 flex justify-center text-start items-center flex-1/2">
        <div className="w-1/2 px-24">
          <h2 className="text-4xl font-bold mb-6 text-green-700 text-start">
            SMK MQ mencetak tenaga ahli siap bersaing di industri
          </h2>
          <p className="mx-auto text-xl text-gray-600 mb-6">
            SMK MQ siap membimbingmu dari nol hingga ahli dengan metode belajar
            terbaik, kelas yang bisa diulang, dan peluang kerja terjamin
          </p>
        </div>
        <div>
          <img src="/assets/group2.png" alt="photos" className="h-[400]" />
        </div>
      </section>

      {/* Diniyah & Umum */}
      <section id="kurikulum" className="min-h-screen py-10 bg-white flex justify-center items-center px-44">
        <div className="flex flex-col gap-12 px-4 max-w-5xl mx-auto">
          <h3 className="text-4xl font-bold text-green-700 mb-2">
            Diniyah & Umum
          </h3>
          <p className="text-gray-600 text-xl">
            Sebagai acuan dasar dalam penyelenggaraan Lembaga Pendidikan
            Sekolah, para santri juga dibekali pelajaran...
          </p>
          <span className="underline text-green-600">
            Learn More
          </span>
        </div>
        <div>
          <img src="/assets/diniyah.png" alt="photos" />
        </div>
      </section>

      {/* Keunggulan */}
      <section className="py-16 text-center min-h-screen mb-24">
        <h2 className="text-3xl font-bold text-green-700 mb-10">
          Keunggulan Sekolah MQ
        </h2>
        <div className="grid md:grid-cols-3 gap-12 px-4 max-w-6xl mx-auto">
         <div className="bg-white shadow-lg rounded-lg p-12 h-80 flex justify-center items-center">
            <img src="/assets/ekskul.png" alt="ekskul" className=" mx-auto mb-4" />
         </div>
         <div className="bg-white shadow-lg rounded-lg p-12 h-80 flex justify-center items-center">
            <img src="/assets/pesantrenit.png" alt="ekskul" className=" mx-auto mb-4" />
         </div>
         <div className="bg-white shadow-lg rounded-lg p-12 h-80 flex justify-center items-center">
            <img src="/assets/keahlian.png" alt="ekskul" className=" mx-auto mb-4" />
         </div>
         <div className="bg-white shadow-lg rounded-lg p-12 h-80 flex justify-center items-center">
            <img src="/assets/serti.png" alt="ekskul" className=" mx-auto mb-4" />
         </div>
         <div className="bg-white shadow-lg rounded-lg p-12 h-80 flex justify-center items-center">
            <img src="/assets/sari.png" alt="ekskul" className=" mx-auto mb-4" />
         </div>
         <div className="bg-white shadow-lg rounded-lg p-12 h-80 flex justify-center items-center">
            <img src="/assets/tenaga.png" alt="ekskul" className=" mx-auto mb-4" />
         </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 rounded-xl mb-24 mx-44 bg-gradient-to-br from-purple-100 to-blue-100 text-center">
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
            className="btn btn-success"
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
