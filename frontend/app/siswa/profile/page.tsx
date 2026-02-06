"use client";
import { IoChevronBackOutline } from "react-icons/io5";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IUser } from "@/app/types";
import { getCookies } from "@/lib/server-cookies";
import { BASE_API_URL } from "@/global";
import { get } from "@/lib/api-bridge";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<IUser | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  const router = useRouter();

  const getUser = async (): Promise<IUser | null> => {
    try {
      const TOKEN = (await getCookies("token")) ?? "";
      const url = `${BASE_API_URL}/user/profile`;
      const { data } = await get(url, TOKEN);

      if (data?.status) return data.data;
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUser();
      setUser(result);
    };
    fetchUser();
  }, []);

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="bg-[#f5f5f5]">
      {/* <div className=" px-10">

        <IoChevronBackOutline
          size={24}
          className="cursor-pointer "
          onClick={handleBackClick}
        />
      </div> */}
      <div className="bg-[#f5f5f5] px-10 py-10 h-screen flex flex-col justify-center items-center font-figtree">
        <div className="h-1/2   w-1/2  bg-oren/80 rounded-t-xl "></div>
        {/* div bawah */}
        <div className="h-1/2 bg-white flex flex-col items-center  w-1/2 rounded-b-xl">
          {/* card start */}
          <div className="bg-white w-max h-max flex flex-col py-6 px-6 gap-6  -mt-16 rounded-xl shadow-md">
            <div className="  flex flex-row justify-center items-center gap-40">
              <div className="flex flex-row justify-center items-center gap-6">
                <Image
                  src="/home/default_profile.png"
                  alt="Profile"
                  width={76}
                  height={76}
                  className="rounded-full object-cover border border-white/20"
                />
                <h2 className="capitalize text-xl font-semibold">
                  {user?.name}
                </h2>
              </div>
              {/*  */}
              <div>
                <p className="uppercase bg-oren px-4 py-2 rounded-full text-white">
                  {user?.role}
                </p>
              </div>
            </div>
          </div>
          {/* card end */}
          <div className="flex flex-row">
            <div>
              <h1>Dashboard</h1>
              <p>Email : </p>
            </div>
            <div>
              <h1>Activity</h1>
              <p>Histori Pembelian</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
