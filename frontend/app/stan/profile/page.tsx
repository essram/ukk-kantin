"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { IStan } from "@/app/types";
import { getCookies } from "@/lib/server-cookies";
import { BASE_API_URL } from "@/global";
import { get, put } from "@/lib/api-bridge";
import { IoChevronBackOutline } from "react-icons/io5";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const [stan, setStan] = useState<IStan | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ nama: "", alamat: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const TOKEN = (await getCookies("token")) ?? "";
      const { data } = await get(`${BASE_API_URL}/stan/profile`, TOKEN);
      if (data?.status) {
        setStan(data.data);
        setFormData({ nama: data.data.nama || "", alamat: data.data.alamat || "" });
      }
    };
    fetchUser();
  }, []);

  const handleBack = () => {
    window.history.back();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    if (!formData.nama.trim()) {
      toast.error("Nama tidak boleh kosong");
      return;
    }

    setIsLoading(true);
    try {
      const TOKEN = (await getCookies("token")) ?? "";
      const { data } = await put(
        `${BASE_API_URL}/stan/profile`,
        JSON.stringify(formData),
        TOKEN
      );

      if (data?.status) {
        toast.success("Profil berhasil diperbarui");
        setStan(data.data);
        setIsEditing(false);
      } else {
        toast.error(data?.message || "Gagal memperbarui profil");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat memperbarui profil");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
              {stan?.nama || "Loading..."}
            </h2>
          </div>
          <span className="bg-oren text-white px-4 py-1 rounded-full text-sm uppercase">
                Stan
          </span>
        </div>
      </div>

      <div className="mt-20 flex justify-center border-b border-gray-200 bg-white">
        <button className={`px-8 py-3 font-semibold transition-all duration-300 border-b-4 border-green-500 text-green-600`}>
          Dashboard
        </button>
      </div>

      <div className="p-10 flex justify-center">
        <div className="w-full max-w-5xl">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">User Information</h3>
              <button
                onClick={() => {
                  if (isEditing) {
                    setFormData({ nama: stan?.nama || "", alamat: stan?.alamat || "" });
                  }
                  setIsEditing(!isEditing);
                }}
                className="px-4 py-2 bg-oren text-white rounded-lg text-sm hover:bg-oren/90 transition"
              >
                {isEditing ? "Batal" : "Edit"}
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label className="text-gray-400 text-xs uppercase font-bold mb-2">
                    Nama Stan
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-oren"
                    placeholder="Masukkan nama stan"
                  />
                </div>

               

                <button
                  onClick={handleUpdateProfile}
                  disabled={isLoading}
                  className="w-full bg-oren text-white py-3 rounded-lg font-semibold hover:bg-oren/90 transition disabled:bg-gray-400"
                >
                  {isLoading ? "Memperbarui..." : "Simpan Perubahan"}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs uppercase font-bold">
                    Nama Stan
                  </span>
                  <span className="text-gray-700 capitalize">{stan?.nama || "-"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs uppercase font-bold">
                    Email
                  </span>
                  <span className="text-gray-700">{stan?.user?.email || "-"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs uppercase font-bold">
                    Phone
                  </span>
                  <span className="text-gray-700 capitalize">
                    {stan?.telp || "-"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
