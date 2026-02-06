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
  const searchParams = useSearchParams(); 
  const search = searchParams.get("search") || ""; 
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
        <span className="bg-orange-100 text-orange-800 text-sm font-medium px-2.5 py-0.5 rounded-full font-poppins">
          Manager
        </span>
      );
    }
    if (role === "SISWA") {
      return (
        <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full font-poppins">
          Cashier
        </span>
      );
    }
  };

  return (
    <div className="m-2 bg-white rounded-lg p-3 font-poppins">
      <h4 className="text-2xl font-bold mt-4 mb-2 text-center">User Data</h4>
      {/* <p className="text-sm text-secondary mb-4">
        This page displays uiser data, allowing user to view details, search,
        and manage user items by adding, editing, or deleting them.
      </p> */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center w-full max-w-md flex-grow">
          <Search url={`/stan/user`} search={search} />
        </div>
        <div className="w-fit">
        <AddUser />
        </div>
      </div>

      {/* Alert jika data kosong */}
      {user.length === 0 ? (
        <Alert>No data available</Alert>
      ) : (
        <div className="my-2">
          {user.map((data, index) => (
            <div
              key={`keyPrestasi${index}`}
              className="flex flex-wrap shadow my-2  w-full items-center"
            >
              <div className="basis-1/6 py-4 px-16 ">
                <h1 className="text-sm font-bold text-primary capitalize text-center mt-6">
                  Picture
                </h1>
                <br />
                <div className="flex justify-center">

                <Image
                  width={54}
                  height={54}
                  src={`${BASE_IMAGE_PROFILE}/${data.profile_picture}`}
                  className="rounded-full overflow-hidden mb-1"
                  alt="preview"
                  unoptimized
                />
                </div>
              </div>

              <div className="basis-1/6 py-4 px-16">
                <h1 className="text-sm font-bold text-primary text-center capitalize mb-6x">Name</h1>
                <br />
                <p className="capitalize text-center  text-sm">
                {data.name}
                </p>
              </div>

              <div className="basis-1/6 py-4 px-16">
                <h1 className="text-sm font-bold text-primary  text-center capitalize">email</h1>
                <br />  
                <p className="text-center text-sm">
                  
                {data.email}
                </p>
              </div>

              <div className="basis-1/6 py-4 px-16">
                <h1 className="text-sm font-bold text-primary  text-center capitalize">Role</h1>
                <br /> 
                <p className="flex justify-center  text-sm">
                  
                {role(data.role)}
                </p>
              </div>

              <div className="basis-1/6 py-4 pl-72">
                <h1 className="text-sm font-bold text-primary text-center capitalize ">Action</h1>
                <br />
                <div className="flex justify-center">
                <EditUser selectedUser={data}/>
                <DeleteUser selectedUser={data}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPage;