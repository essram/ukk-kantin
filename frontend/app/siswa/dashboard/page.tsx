"use client";

import React from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import homeImages from "@/lib/homeImages";
import { BASE_API_URL, BASE_IMAGE_PROFILE } from "@/global";
import { getCookie } from "@/lib/client-cookies";
import { useEffect, useState } from "react";
import { get } from "@/lib/api-bridge";
import { IstOrder } from "@/app/types";
import Link from "next/link";


const getPesanan = async (
  id: number,
): Promise<IstOrder | null> => {
  try {
    const TOKEN = (await getCookie("token")) ?? "";
    const url = `${BASE_API_URL}/statistik/total-pesanan?id=${id}`;
    const { data } = await get(url, TOKEN);
    return data?.status ? data.data : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default function CashierPage() {
  const role = Cookies.get("role") || "Guest";
  const username = Cookies.get("name") || "Cashier";
  const [TotalPesanan, setTotalPesanan] = useState<IstOrder | null>(null);
  const user_id = Cookies.get("id") || 0;


  useEffect(() => {
    const fetchData = async () => {
      const result = await getPesanan(Number(user_id));
      setTotalPesanan(result);
    };
    fetchData();
  }, []);
  return (
    <div className="mx-4 p-4 bg-[#F4F6FA] font-poppins text-hitamGaHitam">
      {/* Welcome Section */}
      <Link href="/siswa/home">home</Link>
      <div className="flex gap-4 items-center">
        <Image
          src={homeImages.Logo}
          alt="logo"
          width={56}
          height={56}
        />
        <div className="flex flex-col capitalize justify-center">
          <h1 className="font-medium text-2xl">Welcome {username}</h1>
          <p className="text-[#989A9C] text-sm">your personal dashboard view</p>
        </div>
      </div>

    {/* basis kiri`  */}
      <div className="flex flex-row mt-10 gap-4">
        <div className="w-3/4 flex flex-col gap-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
              >
                <p className="pb-4 font-medium">Profile</p>
                <Image
                  src={`${BASE_IMAGE_PROFILE}/${getCookie("image")}`}
                  alt="profile"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <h1 className="capitalize pt-4 pb-1 text-lg font-medium">{username}</h1>
                <p className="text-[#6d6f70] text-base">Cashier</p>
              </div>
              
              <div
                className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
              >
                <p className="pb-4 font-medium">Total Pesanan</p>
                <h1 className="capitalize pt-4 pb-1 text-lg font-medium">{TotalPesanan?.totalPesanan}</h1>
                <p className="text-[#6d6f70] text-base">Cashier</p>
              </div>

              <div
                className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
              >
                <p className="pb-4 font-medium">Hari ini</p>
                <h1 className="capitalize pt-4 pb-1 text-lg font-medium">{TotalPesanan?.todayOrder}</h1>
                <p className="text-[#6d6f70] text-base">Rp {TotalPesanan?.sumTodayOrder}</p>
              </div>

              <div
                className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
              >
                <p className="pb-4 font-medium">Bulan ini</p>
                <h1 className="capitalize pt-4 pb-1 text-lg font-medium">{TotalPesanan?.totalOrderBulanIni}</h1>
                <p className="text-[#6d6f70] text-base">Rp {TotalPesanan?.sumMonthlyOrder}</p>
              </div>
          </div>

          {/* grafik  */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-lg font-semibold mb-4">Analisis Penjualan</p>
            <div className="h-64 flex items-center justify-center text-gray-400">
              
            </div>
          </div>
        </div>

        {/* basis kanan */}
        <div className="w-1/4">
          <div className="border-2 border-slate-200 rounded-xl p-4 font-poppins h-full bg-white">
            <p className="text-lg font-medium">2</p>
            <div className="text-gray-500 mt-4">1</div>
          </div>
        </div>
      </div>
    </div>
  );
}
