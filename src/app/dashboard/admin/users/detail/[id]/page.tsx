/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Sidebar from "@/app/components/sidebar";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Image from "next/image";

const MySwal = withReactContent(Swal);

const StudentDetailPage = () => {
  const { id } = useParams();
  const [studentData, setStudentData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"formulir" | "berkas">("formulir");

  const fetchData = async () => {
    try {
      const res = await fetch("/api/statistic");
      if (!res.ok) throw new Error("Gagal mengambil data siswa.");

      const result = await res.json();
      const selectedStudent = result.dataSiswa.find(
        (item: any) => item.siswa.id === id
      );

      if (!selectedStudent) {
        throw new Error("Siswa tidak ditemukan.");
      }

      setStudentData(selectedStudent);
    } catch (error) {
      console.error("Error fetching data:", error);
      MySwal.fire("Error", "Gagal mengambil data siswa.", "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleEditStatus = async () => {
    const result = await MySwal.fire({
      title: "Ubah Status",
      input: "select",
      inputOptions: {
        complete: "Complete",
        pending: "Pending",
        accepted: "Accepted",
      },
      inputPlaceholder: "Pilih status baru",
      showCancelButton: true,
      confirmButtonText: "Ubah",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed && result.value) {
      try {
        const res = await fetch(`/api/siswa/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: result.value, // value dari dropdown
          }),
        });

        if (!res.ok) throw new Error("Gagal mengubah status.");

        await MySwal.fire("Berhasil!", "Status berhasil diubah.", "success");
        fetchData(); // Refresh data
      } catch (error) {
        console.error(error);
        MySwal.fire("Error", "Gagal mengubah status.", "error");
      }
    }
  };

  if (!studentData) return <div className="p-8">Loading...</div>;

  const student = studentData.siswa;
  const berkas = studentData.berkas || {};
  const documents = [
    { label: "Ijazah", url: berkas.ijazahUrl },
    { label: "Surat Keterangan Lulus", url: berkas.suratKeteranganLulusUrl },
    { label: "Rapor", url: berkas.raporUrl },
    { label: "Akta Kelahiran", url: berkas.aktaKelahiranUrl },
    { label: "Foto 3x4", url: berkas.foto3x4Url },
    { label: "Kartu Keluarga", url: berkas.kartuKeluargaUrl },
  ];

  return (
    <div className="flex bg-white text-black dark:bg-[#2a3a818a] dark:text-white">
      <Sidebar />
      <div className="p-8 flex-1">
        <h1 className="text-2xl font-bold mb-6">Student Details</h1>

        {/* Tab buttons */}
        <div className="flex gap-4 pb-4 mb-4">
          <button
            onClick={() => setActiveTab("formulir")}
            className={`btn border-none rounded shadow text-white ${
              activeTab === "formulir"
                ? "bg-[#278550] dark:bg-primary"
                : "text-gray-600 bg-[#50A663] dark:bg-info"
            }`}
          >
            Formulir Siswa
          </button>
          <button
            onClick={() => setActiveTab("berkas")}
            className={`btn border-none rounded shadow text-white ${
              activeTab === "berkas"
                ? "bg-[#278550] dark:bg-primary"
                : "text-gray-600 bg-[#50A663] dark:bg-info"
            }`}
          >
            Berkas Siswa
          </button>
        </div>

        {/* Nama Atas */}
        <div className="bg-white shadow-md rounded p-4 mb-4 dark:bg-[#0F103F] dark:text-white">
          <p className="text-3xl font-semibold dark:text-white text-black">
            {student?.nama}
          </p>
        </div>

        {/* === FORMULIR === */}
        {activeTab === "formulir" && (
          <>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-semibold text-xl">Nama Lengkap:</span>
                <p className="text-lg">{student?.nama}</p>
              </div>
              <div>
                <span className="font-semibold text-xl">Jurusan:</span>
                <p className="text-lg">{student?.jurusan}</p>
              </div>
              <div>
                <span className="font-semibold text-xl">Asal Sekolah:</span>
                <p className="text-lg">{student?.asalSekolah}</p>
              </div>

              <div>
                <span className="font-semibold text-xl">NISN:</span>
                <p className="text-lg">{student?.nisn}</p>
              </div>
              <div>
                <span className="font-semibold text-xl">Nama Ibu:</span>
                <p className="text-lg">{student?.namaIbu}</p>
              </div>
              <div>
                <span className="font-semibold text-xl">Nama Bapak:</span>
                <p className="text-lg">{student?.namaAyah}</p>
              </div>

              <div>
                <span className="font-semibold text-xl">Pekerjaan Ibu:</span>
                <p className="text-lg">{student?.pekerjaanIbu}</p>
              </div>
              <div>
                <span className="font-semibold text-xl">Pekerjaan Bapak:</span>
                <p className="text-lg">{student?.pekerjaanAyah}</p>
              </div>
              <div>
                <span className="font-semibold text-xl">
                  No. Telepon Orang Tua:
                </span>
                <p className="text-lg">{student?.noTelpOrtu}</p>
              </div>

              <div>
                <span className="font-semibold text-xl">Alamat Rumah:</span>
                <p className="text-lg">{student?.alamat}</p>
              </div>
              <div>
                <span className="font-semibold text-xl">Golongan Darah:</span>
                <p className="text-lg">{student?.golonganDarah}</p>
              </div>
              <div>
                <span className="font-semibold text-xl">Jenis Kelamin:</span>
                <p className="text-lg">{student?.jenisKelamin}</p>
              </div>

              <div>
                <span className="font-semibold text-xl">Provinsi:</span>
                <p className="text-lg">{student?.provinsi}</p>
              </div>
              <div>
                <span className="font-semibold text-xl">Asal Kota:</span>
                <p className="text-lg">{student?.domisili}</p>
              </div>
              <div>
                <span className="font-semibold text-xl">Kecamatan:</span>
                <p className="text-lg">{student?.kecamatan}</p>
              </div>
            </div>

            <div className="mt-8 text-right">
              <button
                onClick={handleEditStatus}
                className="btn bg-[#50A663] dark:bg-info dark:text-[#0F103F] text-white border-none"
              >
                Edit Status
              </button>
            </div>
          </>
        )}

        {/* === BERKAS === */}
        {activeTab === "berkas" && (
          <>
            <div className="grid grid-cols-3 gap-10 text-sm">
              {documents.map((doc, idx) => (
                <div key={idx}>
                  <div className="font-semibold mb-1">{doc.label}</div>
                  <div className="mb-2">
                    {doc.url ? (
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={doc.url}
                          alt={doc.label}
                          className="w-full h-auto max-h-40 object-contain border rounded"
                          width={200}
                          height={200}
                        />
                      </a>
                    ) : (
                      <span className="text-gray-500 italic">
                        Tidak ada file
                      </span>
                    )}
                  </div>
                  {doc.url && (
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn text-white bg-[#278550] py-2 border-none w-full dark:bg-primary"
                    >
                      Lihat
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 text-right">
              <button className="btn bg-[#50A663] dark:bg-info dark:text-[#0F103F] text-white border-none">
                Hapus Berkas
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentDetailPage;
