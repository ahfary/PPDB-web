"use client";
import Sidebar from "@/app/components/sidebar";
import Image from "next/image";
import React, { useState } from "react";
import clsx from "clsx";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Mr Abqory",
    email: "abqory@example.com",
    phone: "085134563182",
    gender: "",
    dob: "2027-04-18",
    role: "Administrator",
    avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Submit logic here
  };
  return (
    <div className="flex bg-gray-100 text-black">
      <Sidebar />
      <div>
        <div className="p-8">
          <h1 className="text-2xl font-bold">Profil</h1>
        </div>
        <div className="p-8 border-2 mx-8 w-[210%]">
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="relative">
              <Image
                src={formData.avatar}
                alt="User Avatar"
                width={100}
                height={100}
                className="rounded-full border"
              />
              <button
                disabled={!isEditing}
                className="absolute bottom-0 right-0 bg-white p-1 rounded-full border shadow-sm text-sm disabled:opacity-50"
              >
                ✎
              </button>
            </div>
            <button
              disabled={!isEditing}
              className={clsx(
                `btn btn-info mt-2`,
                isEditing ? "text-white" : "text-gray-400"
              )}
            >
              Change Photo
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-1 p-2 w-full border rounded-md bg-gray-100 disabled:bg-gray-200"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-1 p-2 w-full border rounded-md bg-gray-100 disabled:bg-gray-200"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-1 p-2 w-full border rounded-md bg-gray-100 disabled:bg-gray-200"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Gender</label>
                <div className="flex items-center gap-4 mt-1">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="gender"
                      value="Laki-Laki"
                      checked={formData.gender === "Laki-Laki"}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    Laki - Laki
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="gender"
                      value="Perempuan"
                      checked={formData.gender === "Perempuan"}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    Perempuan
                  </label>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-1 p-2 w-full border rounded-md bg-gray-100 disabled:bg-gray-200"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-1 p-2 w-full border rounded-md bg-gray-100 disabled:bg-gray-200"
                >
                  <option value="Administrator">Administrator</option>
                  <option value="User">User</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6">
              <button
                type="button"
                onClick={handleEditToggle}
                className={clsx(
                  "btn bg-[#50A663] border-[#50A663] text-white",
                  isEditing ? "w-1/2" : "w-full"
                )}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
              {isEditing && (
                <button
                  type="submit"
                  className="btn btn-success w-1/2 text-white"
                >
                  Save Changes
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
