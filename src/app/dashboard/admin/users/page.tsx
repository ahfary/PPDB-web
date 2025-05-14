import Sidebar from "@/app/components/sidebar";
import React from "react";

const Users = () => {
  const users = [
    {
      name: "Ihsan Santana Wibawa",
      phone: "089123456789",
      email: "carleen@jarnand.no",
      status: "Active",
    },
    {
      name: "Nurdiansyah",
      phone: "089123456789",
      email: "cristofer.alen@love.no",
      status: "Active",
    },
    {
      name: "Rehan",
      phone: "089123456789",
      email: "camp@hotmail.com",
      status: "Inactive",
    },
    {
      name: "Fathi",
      phone: "089123456789",
      email: "williams.ash@mevil.com",
      status: "Active",
    },
    {
      name: "Risky",
      phone: "089123456789",
      email: "lora.palm@gmail.com",
      status: "Active",
    },
    // Tambahkan user lainnya sesuai kebutuhan
  ];
  return (
    <div className="flex bg-gray-100 text-black">
      <Sidebar />
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Members</h1>
          <div className="space-x-2">
            <button className="btn btn-primary">
              Add new
            </button>
            <button className="btn btn-accent">
              Import members
            </button>
            <button className="btn btn-accent">
              Export members (Excel)
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-sm">
            <thead className="text-left text-gray-500 border-b">
              <tr>
                <th className="p-4">Photo</th>
                <th className="p-4">Member name</th>
                <th className="p-4">Mobile</th>
                <th className="p-4">Email</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <img
                      src="https://randomuser.me/api/portraits/lego/1.jpg"
                      alt={user.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.phone}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
