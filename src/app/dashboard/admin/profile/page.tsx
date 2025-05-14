'use client';
import Sidebar from "@/app/components/sidebar";
import Image from "next/image";
import React, { useState } from "react";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "Mr Abqory",
    email: "abqory@example.com",
    role: "Administrator",
    avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsEditing(false);
    // TODO: Kirim data ke backend di sini kalau sudah terhubung
    console.log("Saved:", formData);
  };
  return (
    <div className="flex bg-gray-100 text-black">
      <Sidebar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

        <div className="bg-white p-6 rounded-xl shadow-md max-w-xl">
          <div className="flex items-center gap-6 mb-6">
            <Image
              src={formData.avatar}
              alt="Avatar"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold">{formData.name}</h2>
              <p className="text-gray-600">{formData.email}</p>
              <p className="text-sm text-gray-500">{formData.role}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Full Name</label>
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
              <label className="text-sm text-gray-500">Email</label>
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
              <label className="text-sm text-gray-500">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled
                className="mt-1 p-2 w-full border rounded-md bg-gray-200"
              />
            </div>

            {isEditing ? (
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn btn-error text-white"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="btn btn-info"
              >
                Edit Profile
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
