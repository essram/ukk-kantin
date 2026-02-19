"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { IUser } from "@/app/types";
import { getCookies } from "@/lib/server-cookies";
import { BASE_API_URL } from "@/global";
import { get } from "@/lib/api-bridge";
import { IoChevronBackOutline } from "react-icons/io5";
import TransaksiContent from "@/components/transaksiContent";

export default function ProfilePage() {
  const [user, setUser] = useState<IUser | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const fetchUser = async () => {
      const TOKEN = (await getCookies("token")) ?? "";
      const { data } = await get(`${BASE_API_URL}/user/profile`, TOKEN);
      if (data?.status) setUser(data.data);
    };
    fetchUser();
  }, []);

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen font-figtree relative">
      <div className="absolute top-0 left-0 z-10 p-6">
        <IoChevronBackOutline
          size={30}
          className="cursor-pointer text-white hover:text-black transition-colors"
          onClick={handleBack}
        />
      </div>

      <div className="bg-oren/80 h-48 w-full flex justify-center items-end">
        <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 p-6 rounded-xl shadow-md flex justify-between items-center -mb-12">
          <div className="flex items-center gap-4">
            <Image
              src="/home/default_profile.png"
              alt="Profile"
              width={76}
              height={76}
              className="rounded-full border shadow-sm"
            />
            <h2 className="text-xl font-bold capitalize">
              {user?.name || "Loading..."}
            </h2>
          </div>
          <span className="bg-oren text-white px-4 py-1 rounded-full text-sm uppercase">
            {user?.role}
          </span>
        </div>
      </div>

      <div className="mt-20 flex justify-center border-b border-gray-200 bg-white">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`px-8 py-3 font-semibold transition-all duration-300 ${
            activeTab === "dashboard"
              ? "border-b-4 border-green-500 text-green-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab("activity")}
          className={`px-8 py-3 font-semibold transition-all duration-300 ${
            activeTab === "activity"
              ? "border-b-4 border-green-500 text-green-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Activity
        </button>
      </div>

      <div className="p-10 flex justify-center">
        <div className="w-full max-w-5xl">
          {activeTab === "dashboard" ? (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold mb-4">User Information</h3>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs uppercase font-bold">
                    Email
                  </span>
                  <span className="text-gray-700">{user?.email || "-"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs uppercase font-bold">
Address                  </span>
                  <span className="text-gray-700 capitalize">
                    {user?.siswa?.alamat || "-"}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-fadeIn">
              <TransaksiContent />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
