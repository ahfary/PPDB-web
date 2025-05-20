"use client";

import Sidebar from "@/app/components/sidebar";
import { FaEye, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";

const Users = () => {
  const users = [
    {
      name: "Valent",
      location: "Kab. Bandung",
      major: "Rekayasa Perangkat Lunak",
      phone: "08512219132421",
      email: "smkadmin@gmail.com",
      status: "Tech Interview",
    },
    {
      name: "User",
      location: "Jakarta",
      major: "Rekayasa Perangkat Lunak",
      phone: "0892321423123",
      email: "smkadmin@gmail.com",
      status: "Task",
    },
    {
      name: "User",
      location: "Kuta",
      major: "Teknik Komputer Dan Jaringan",
      phone: "0842377522221",
      email: "smkadmin@gmail.com",
      status: "Resume Review",
    },
    {
      name: "User",
      location: "Bekasi",
      major: "Rekayasa Perangkat Lunak",
      phone: "083123445424431",
      email: "smkadmin@gmail.com",
      status: "Final Interview",
    },
  ];

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

  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("Nama");

  // Filter users berdasarkan filterBy dan searchTerm
  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();

    if (!term) return true; // jika kosong, tampilkan semua

    switch (filterBy) {
      case "Nama":
        return user.name.toLowerCase().includes(term);
      case "Domisili":
        return user.location.toLowerCase().includes(term);
      case "Jurusan":
        return user.major.toLowerCase().includes(term);
      default:
        return false;
    }
  });

  const [dataSiswa, setDataSiswa] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/statistic");
      const result = await res.json();
      setDataSiswa(result.dataSiswa);
    };

    fetchData();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Students</h1>
          <div className="join">
            <input
              className="input join-item bg-gray-200 w-80"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="select join-item bg-gray-200"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option>Nama</option>
              <option>Domisili</option>
              <option>Jurusan</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full">
            <thead className="text-left text-gray-500 border-b">
              <tr>
                <th className="p-4">No.</th>
                <th className="p-4">Photo</th>
                <th className="p-4">Name</th>
                <th className="p-4">Major</th>
                <th className="p-4">Phone number</th>
                <th className="p-4">Asal Sekolah</th>
                <th className="p-4">Status</th>
                <th className="p-4">More</th>
              </tr>
            </thead>
            <tbody>

              {
                dataSiswa.length > 0 ? (
                dataSiswa.map((item: any, index: number) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">
                    <img
                      src="https://randomuser.me/api/portraits/lego/1.jpg"
                      className="w-10 h-10 rounded-full"
                      alt="avatar"
                    />
                  </td>
                  <td className="p-4">
                    <div className="font-semibold">{item.siswa.nama}</div>
                    <div className="text-sm text-gray-500">{item.siswa.alamat}</div>
                  </td>
                  <td className="p-4">{item.siswa.jurusan}</td>
                  <td className="p-4">{item.siswa.noTelpOrtu}</td>
                  <td className="p-4">{item.siswa.asalSekolah}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(
                        item.siswa.status
                      )}`}
                    >
                      {item.siswa.status}
                    </span>
                  </td>
                  <td className="p-4 flex items-center gap-3">
                    <button className="text-gray-600 hover:text-black">
                      <FaEye className="cursor-pointer" size={24} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
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
                )
              }
              {/* {filteredUsers.map((user, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="p-4">{idx + 1}</td>
                  <td className="p-4">
                    <img
                      src="https://randomuser.me/api/portraits/lego/1.jpg"
                      className="w-10 h-10 rounded-full"
                      alt="avatar"
                    />
                  </td>
                  <td className="p-4">
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.location}</div>
                  </td>
                  <td className="p-4">{user.major}</td>
                  <td className="p-4">{user.phone}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 flex items-center gap-3">
                    <button className="text-gray-600 hover:text-black">
                      <FaEye className="cursor-pointer" size={24} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <FaTrash className="cursor-pointer" size={24} />
                    </button>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-end p-4">
            <div className="join">
              <button className="join-item bg-gray-200 text-gray-500 btn btn-md border-none outline-none focus:outline-none">
                «
              </button>
              <button className="join-item bg-gray-200 text-gray-500 btn btn-md btn-active border-none outline-none focus:outline-none">
                1
              </button>
              <button className="join-item bg-gray-200 text-gray-500 btn btn-md border-none outline-none focus:outline-none">
                2
              </button>
              <button className="join-item bg-gray-200 text-gray-500 btn btn-md border-none outline-none focus:outline-none">
                3
              </button>
              <button className="join-item bg-gray-200 text-gray-500 btn btn-md border-none outline-none focus:outline-none">
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
