"use client";

import Sidebar from "@/app/components/sidebar";
import { FaEye, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Image from "next/image";

const MySwal = withReactContent(Swal);

const LIMIT = 8;

const Users = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") || "1");
  const [dataSiswa, setDataSiswa] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("Nama");

  const getBadgeColor = (status: string) => {
    switch (status) {
      case "Tech Interview":
        return "bg-orange-100 text-orange-600";
      case "Task":
        return "bg-yellow-100 text-yellow-600";
      case "Resume Review":
        return "bg-purple-100 text-purple-600";
      case "Final Interview":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/statistic");
        if (!res.ok) throw new Error("Gagal mengambil data siswa.");
        const result = await res.json();
        setDataSiswa(result.dataSiswa);
      } catch (error) {
        console.error("Error fetching data:", error);
        MySwal.fire("Error", "Gagal mengambil data siswa.", "error");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = dataSiswa.filter((item: any) => {
      if (!term) return true;
      switch (filterBy) {
        case "Nama":
          return item.siswa?.nama.toLowerCase().includes(term);
        case "Domisili":
          return item.siswa?.domisili.toLowerCase().includes(term);
        case "Jurusan":
          return item.siswa?.jurusan.toLowerCase().includes(term);
        default:
          return false;
      }
    });

    setFilteredUsers(filtered);
  }, [searchTerm, filterBy, dataSiswa]);

  const startIndex = (pageParam - 1) * LIMIT;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + LIMIT);
  const totalPages = Math.ceil(filteredUsers.length / LIMIT);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/siswa/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal menghapus data siswa.");
      }
      setDataSiswa((prev) => prev.filter((item: any) => item.siswa?.id !== id));
      MySwal.fire("Terhapus!", "Data berhasil dihapus.", "success");
    } catch (err: any) {
      console.error("Error deleting data:", err);
      MySwal.fire("Gagal!", err.message || "Terjadi kesalahan saat menghapus.", "error");
    }
  };

  const goToPage = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen text-black dark:bg-[#2a3a818a] dark:text-white">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Students</h1>
          <div className="join">
            <input
              className="input join-item bg-gray-200 w-80 dark:bg-[#0F103F]"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="select join-item bg-gray-200 dark:bg-[#0F103F]"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option>Nama</option>
              <option>Domisili</option>
              <option>Jurusan</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow-md text-black dark:bg-white/40 dark:text-white">
          <table className="min-w-full">
            <thead className="text-left text-gray-500 border-b">
              <tr>
                <th className="p-4 dark:text-[#0F103F]">No.</th>
                <th className="p-4 dark:text-[#0F103F]">Photo</th>
                <th className="p-4 dark:text-[#0F103F]">Nama</th>
                <th className="p-4 dark:text-[#0F103F]">Jurusan</th>
                <th className="p-4 dark:text-[#0F103F]">Nomor Telepon</th>
                <th className="p-4 dark:text-[#0F103F]">Asal Sekolah</th>
                <th className="p-4 dark:text-[#0F103F]">Status</th>
                <th className="p-4 dark:text-[#0F103F]">Lainnya</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((item: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-white/10">
                    <td className="p-4">{startIndex + index + 1}</td>
                    <td className="p-4">
                      <Image
                        src="https://randomuser.me/api/portraits/lego/1.jpg"
                        className="w-10 h-10 rounded-full"
                        alt="avatar"
                        width={40}
                        height={40}
                      />
                    </td>
                    <td className="p-4">
                      <div className="font-semibold">{item.siswa?.nama}</div>
                      <div className="text-sm text-gray-500">{item.siswa?.alamat}</div>
                    </td>
                    <td className="p-4">{item.siswa?.jurusan}</td>
                    <td className="p-4">{item.siswa?.noTelpOrtu}</td>
                    <td className="p-4">{item.siswa?.asalSekolah}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(
                          item.siswa?.status
                        )}`}
                      >
                        {item.siswa?.status}
                      </span>
                    </td>
                    <td className="p-4 flex items-center gap-3">
                      <button
                        className="text-gray-400 hover:text-black"
                        onClick={() =>
                          MySwal.fire({
                            title: <p>{item.siswa?.nama}</p>,
                            html: (
                              <div className="text-left">
                                <p><strong>Domisili:</strong> {item.siswa?.domisili}</p>
                                <p><strong>Asal Sekolah:</strong> {item.siswa?.asalSekolah}</p>
                                <p><strong>Jurusan:</strong> {item.siswa?.jurusan}</p>
                              </div>
                            ),
                            showCancelButton: true,
                            showConfirmButton: true,
                            confirmButtonText: "Lihat Detail",
                            cancelButtonText: "Tutup",
                            reverseButtons: true,
                          }).then((result: any) => {
                            if (result.isConfirmed) {
                              router.push(`/dashboard/admin/users/detail/${item.siswa?.id}`);
                            }
                          })
                        }
                      >
                        <FaEye className="cursor-pointer" size={24} />
                      </button>
                      <button
                        className="text-gray-400 hover:text-red-500"
                        onClick={async () => {
                          const result = await MySwal.fire({
                            title: "Yakin ingin menghapus?",
                            text: "Data ini tidak dapat dikembalikan!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#d33",
                            cancelButtonColor: "#3085d6",
                            confirmButtonText: "Ya, hapus!",
                            cancelButtonText: "Batal",
                          });
                          if (result.isConfirmed) {
                            handleDelete(item.siswa?.id || "");
                          }
                        }}
                      >
                        <FaTrash className="cursor-pointer" size={24} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center p-4">
                    Tidak ada data yang ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-end p-4">
            <div className="join">
              <button
                className="join-item bg-gray-200 text-gray-500 btn btn-md border-none"
                onClick={() => pageParam > 1 && goToPage(pageParam - 1)}
              >
                «
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`join-item btn btn-md border-none ${
                    pageParam === i + 1
                      ? "btn-active bg-gray-400 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                  onClick={() => goToPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="join-item bg-gray-200 text-gray-500 btn btn-md border-none"
                onClick={() => pageParam < totalPages && goToPage(pageParam + 1)}
              >
                »
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
