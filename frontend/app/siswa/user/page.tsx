"use client"; // Tambahkan agar jadi Client Component

import { IUser } from "@/app/types";
import { getCookies } from "../../../lib/server-cookies";
import { BASE_API_URL, BASE_IMAGE_PROFILE } from "@/global";
import { get } from "@/lib/api-bridge";
import Alert from "../../../components/alert/page";
import Image from "next/image";
import Search from "../../../components/menu/SearchData";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AddUser from "@/components/user/AddUser";
import EditUser from "@/components/user/EditUser";
import DeleteUser from "@/components/user/DeleteUser";

const getUser = async (search: string): Promise<IUser[]> => {
  try {
    const TOKEN = (await getCookies("token")) ?? "";
    const url = `${BASE_API_URL}/user?search=${search}`;
    const { data } = await get(url, TOKEN);
    let result: IUser[] = [];
    if (data?.status) result = [...data.data];
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const UserPage = () => {
  const searchParams = useSearchParams(); // Gunakan React Hook
  const search = searchParams.get("search") || ""; // Ambil parameter 'search'
  const [user, setUser] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUser(search);
      setUser(result);
    };
    fetchData();
  }, [search]);

  const role = (role: string): React.ReactNode => {
    if (role === "ADMIN_STAN") {
      return (
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
          Manager
        </span>
      );
    }
    if (role === "SISWA") {
      return (
        <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
          Cashier
        </span>
      );
    }
  };

  return (
    <div className="m-2 bg-white rounded-lg p-3  border-t-4 border-t-primary shadow-md">
      <h4 className="text-xl font-bold mb-2">User Data</h4>
      <p className="text-sm text-secondary mb-4">
        This page displays uiser data, allowing user to view details, search,
        and manage user items by adding, editing, or deleting them.
      </p>

      {/* Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center w-full max-w-md flex-grow">
          <Search url={`/stan/user`} search={search} />
        </div>
        {/* <AddUser /> */}
      </div>

      {/* Alert jika data kosong */}
      {user.length === 0 ? (
        <Alert>No data available</Alert>
      ) : (
        <div className="m-2">
          {user.map((data, index) => (
            <div
              key={`keyPrestasi${index}`}
              className="flex flex-wrap shadow m-2"
            >
              <div className="w-full md:w-1/12 p-2">
                <small className="text-sm font-bold text-primary">
                  Picture
                </small>
                <br />
                <Image
                  width={40}
                  height={40}
                  src={`${BASE_IMAGE_PROFILE}/${data.profil_picture}`}
                  className="rounded-sm overflow-hidden"
                  alt="preview"
                  unoptimized
                />
              </div>

              <div className="w-full md:w-2/12 p-2">
                <small className="text-sm font-bold text-primary">Name</small>
                <br />
                {data.name}
              </div>

              <div className="w-full md:w-1/12 p-2">
                <small className="text-sm font-bold text-primary">email</small>
                <br />
                {data.email}
              </div>

              <div className="w-full md:w-1/12 p-2">
                <small className="text-sm font-bold text-primary">Role</small>
                <br />
                {role(data.role)}
              </div>

              <div className="w-full md:w-2/12 p-2">
                <small className="text-sm font-bold text-primary">Action</small>
                <br />
                <EditUser selectedUser={data} />
                <DeleteUser selectedUser={data} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPage;
