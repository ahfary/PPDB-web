/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FileText, User } from 'lucide-react';
import { Icon } from "@iconify/react";

const MySwal = withReactContent(Swal);

// Import your Sidebar component
import Sidebar from "@/app/components/sidebar";
import { ParamValue } from "next/dist/server/request/params";

type StudentData = {
  siswa: {
    id: string;
    nama?: string;
    golonganDarah?: string;
    jenisKelamin?: string;
    jurusan?: string;
    namaIbu?: string;
    noTelpOrtu?: string;
    namaAyah?: string;
    alamat?: string;
    asalSekolah?: string;
    pekerjaanIbu?: string;
    nisn?: string;
    kecamatan?: string;
    provinsi?: string;
    domisili?: string;
    pekerjaanAyah?: string;
    // add other fields as needed
  };
  berkas?: {
    ijazahUrl?: string;
    suratKeteranganLulusUrl?: string;
    raporUrl?: string;
    aktaKelahiranUrl?: string;
    foto3x4Url?: string;
    kartuKeluargaUrl?: string;
    // add other fields as needed
  };
  // add other fields as needed
};

const StudentDetailsPage = () => {
  const { id } = useParams();
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [activeTab, setActiveTab] = useState("formulir");

  const fetchData = async () => {
    try {
      const res = await fetch("/api/statistic");
      if (!res.ok) throw new Error("Gagal mengambil data siswa.");

      const result = await res.json();
      const selectedStudent = result.dataSiswa.find(
        (item: { siswa: { id: ParamValue; }; }) => item.siswa.id === id
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
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar fixed on the left */}
      <div className="fixed inset-y-0 left-0 z-30 w-64">
        <Sidebar />
      </div>

      {/* Main Content with left margin to accommodate the fixed sidebar */}
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Student Details</h1>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("formulir")}
            className={`px-6 py-2 rounded ${
              activeTab === "formulir"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Formulir Siswa
          </button>
          <button
            onClick={() => setActiveTab("berkas")}
            className={`px-6 py-2 rounded ${
              activeTab === "berkas"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Berkas Siswa
          </button>
        </div>

        {/* Student Header Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              {berkas.foto3x4Url ? (
                <img
                  src={berkas.foto3x4Url}
                  alt="Foto 3x4"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={40} className="text-gray-600" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <User size={20} className="text-gray-600" />
                <span className="text-sm text-black">Nama Lengkap</span>
              </div>
              <input
                type="text"
                value={student?.nama || ""}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-black text-lg"
              />
              <div className="flex gap-4 mt-4">
                <div className="flex-1 max-w-[260px]">
                  <span className="text-sm text-black block mb-1">Golongan Darah</span>
                  <input
                    type="text"
                    value={student?.golonganDarah || "-"}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm"
                  />
                </div>
                <div className="flex-1 max-w-[300px]">
                  <span className="text-sm text-black block mb-1">Jenis Kelamin</span>
                  <input
                    type="text"
                    value={student?.jenisKelamin || "-"}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm"
                  />
                </div>
                <div className="flex items-end flex-1 gap-2">
                  <button
                    onClick={handleEditStatus}
                    className="bg-green-600 hover:bg-green-700 text-white px-10 py-2 rounded-lg w-full"
                  >
                    Edit Status
                  </button>
                  <button
                    onClick={async () => {
                      const result = await MySwal.fire({
                        title: "Hapus Berkas",
                        text: "Apakah Anda yakin ingin menghapus semua berkas siswa ini?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Ya, hapus",
                        cancelButtonText: "Batal",
                      });
                      if (result.isConfirmed) {
                        try {
                          const res = await fetch(`/api/siswa/${id}/berkas`, {
                            method: "DELETE",
                          });
                          if (!res.ok) throw new Error("Gagal menghapus berkas.");
                          await MySwal.fire("Berhasil!", "Berkas berhasil dihapus.", "success");
                          fetchData();
                        } catch (error) {
                          console.error(error);
                          MySwal.fire("Error", "Gagal menghapus berkas.", "error");
                        }
                      }
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-10 py-2 rounded-lg w-full"
                  >
                    Hapus Berkas
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        {activeTab === "formulir" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-green-600">
                <Icon icon="lucide:user" width={20} height={20} />
              </span>
              <span className="text-lg font-semibold text-gray-800">Formulir Siswa</span>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {/* Jurusan */}
              <div className="bg-white rounded-lg shadow p-4">
                <span className="text-sm text-black block mb-2 items-center gap-1">
                  <Icon icon="mdi:school-outline" className="text-green-600" width={16} height={16} />
                  Jurusan
                </span>
                <input
                  type="text"
                  value={student?.jurusan || "-"}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-black"
                />
              </div>

              {/* Nama Ibu */}
              <div className="bg-white rounded-lg shadow p-4">
                <span className="text-sm text-black block mb-2 items-center gap-1">
                  <Icon icon="mdi:human-female" className="text-pink-500" width={16} height={16} />
                  Nama Ibu
                </span>
                <input
                  type="text"
                  value={student?.namaIbu || "-"}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-black"
                />
              </div>

              {/* No. Telpon Orang Tua */}
              <div className="bg-white rounded-lg shadow p-4">
                <span className="text-sm text-black block mb-2 items-center gap-1">
                  <Icon icon="mdi:phone-outline" className="text-blue-500" width={16} height={16} />
                  No. Telpon Orang Tua
                </span>
                <input
                  type="text"
                  value={student?.noTelpOrtu || "-"}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-black"
                />
              </div>

              {/* Nama Bapak */}
              <div className="bg-white rounded-lg shadow p-4">
                <span className="text-sm text-black block mb-2 flex items-center gap-1">
                  <Icon icon="mdi:human-male" className="text-blue-700" width={16} height={16} />
                  Nama Ayah
                </span>
                <input
                  type="text"
                  value={student?.namaAyah || "-"}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-black"
                />
              </div>

              {/* Alamat Rumah */}
              <div className="col-span-2 bg-white rounded-lg shadow p-4">
                <span className="text-sm text-black block mb-2 flex items-center gap-1">
                  <Icon icon="mdi:home-outline" className="text-yellow-600" width={16} height={16} />
                  Alamat Rumah
                </span>
                <input
                  type="text"
                  value={student?.alamat || "-"}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-black"
                />
              </div>

              {/* Asal Sekolah */}
              <div className="bg-white rounded-lg shadow p-4">
                <span className="text-sm text-black block mb-2 flex items-center gap-1">
                  <Icon icon="mdi:school" className="text-purple-600" width={16} height={16} />
                  Asal Sekolah
                </span>
                <input
                  type="text"
                  value={student?.asalSekolah || "-"}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-black"
                />
              </div>

              {/* Pekerjaan Ibu */}
              <div className="bg-white rounded-lg shadow p-4">
                <span className="text-sm text-black block mb-2 flex items-center gap-1">
                  <Icon icon="mdi:briefcase-outline" className="text-pink-600" width={16} height={16} />
                  Pekerjaan Ibu
                </span>
                <input
                  type="text"
                  value={student?.pekerjaanIbu || "-"}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-black"
                />
              </div>

              {/* NISN */}
              <div className="bg-white rounded-lg shadow p-4">
                <span className="text-sm text-black block mb-2 flex items-center gap-1">
                  <Icon icon="mdi:card-account-details-outline" className="text-gray-700" width={16} height={16} />
                  NISN
                </span>
                <input
                  type="text"
                  value={student?.nisn || "-"}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-black"
                />
              </div>

              {/* Kecamatan */}
              <div className="bg-white rounded-lg shadow p-4">
                <span className="text-sm text-black block mb-2 flex items-center gap-1">
                  <Icon icon="mdi:map-marker-radius-outline" className="text-green-700" width={16} height={16} />
                  Kecamatan
                </span>
                <input
                  type="text"
                  value={student?.kecamatan || "-"}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-black"
                />
              </div>

              {/* Provinsi */}
              <div className="bg-white rounded-lg shadow p-4">
                <span className="text-sm text-black block mb-2 flex items-center gap-1">
                  <Icon icon="mdi:earth" className="text-orange-600" width={16} height={16} />
                  Provinsi
                </span>
                <input
                  type="text"
                  value={student?.provinsi || "-"}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-black"
                />
              </div>

              {/* Asal Kota / Domisili */}
              <div className="bg-white rounded-lg shadow p-4">
                <span className="text-sm text-black block mb-2 flex items-center gap-1">
                  <Icon icon="mdi:city-variant-outline" className="text-blue-400" width={16} height={16} />
                  Asal Kota
                </span>
                <input
                  type="text"
                  value={student?.domisili || "-"}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-black"
                />
              </div>

              {/* Pekerjaan Ayah */}
              <div className="bg-white rounded-lg shadow p-4">
                <span className="text-sm text-black block mb-2 flex items-center gap-1">
                  <Icon icon="mdi:briefcase-outline" className="text-blue-600" width={16} height={16} />
                  Pekerjaan Ayah
                </span>
                <input
                  type="text"
                  value={student?.pekerjaanAyah || "-"}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-black"
                />
              </div>
            </div>
          </div>
        )}

        {/* Berkas Tab Content */}
        {activeTab === "berkas" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Documents List */}
            <div className="space-y-4">
              {documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    {/* Document Preview or Icon */}
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
                      {doc.url ? (
                        // Show image preview if it's an image, otherwise show icon
                        /\.(jpg|jpeg|png|webp|gif)$/i.test(doc.url) ? (
                          <img
                            src={doc.url}
                            alt={doc.label}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <FileText size={32} className="text-gray-500" />
                        )
                      ) : (
                        <FileText size={32} className="text-gray-300" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{doc.label}</h3>
                      <p className="text-sm text-gray-600">
                        {doc.url
                          ? `Document Name: ${doc.label
                              .toLowerCase()
                              .replace(/\s+/g, "")}.${doc.url.split(".").pop()}`
                          : "Belum diupload"}
                      </p>
                    </div>
                  </div>
                  {doc.url && (
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                    >
                      Lihat
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetailsPage;