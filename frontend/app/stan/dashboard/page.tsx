"use client"; // Tambahkan agar jadi Client Component

import { iCategory, IMenu } from "@/app/types";
import { getCookies } from "../../../lib/server-cookies";
import { BASE_API_URL, BASE_IMAGE_MENU } from "@/global";
import { get } from "@/lib/api-bridge";
import Alert from "../../../components/alert/page";
import Image from "next/image";
import Search from "../../../components/menu/SearchData";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AddMenu from "../../../components/menu/AddMenu";
import EditMenu from "../../../components/menu/EditMenu";
import DeleteMenu from "@/components/menu/DeleteMenu";
import Sidebar from "@/components/sidebar";
import AddDiskonMenu from "@/components/modalAddDiskon";

const getMenu = async (search: string): Promise<IMenu[]> => {
  try {
    const TOKEN = (await getCookies("token")) ?? "";
    const stan_id = (await getCookies("stan_id")) ?? "";
    const url = `${BASE_API_URL}/menu?search=${search}&id_stan=${stan_id}`;
    const { data } = await get(url, TOKEN);
    console.log(data);

    let result: IMenu[] = [];
    if (data?.status) result = [...data.data];
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const MenuPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const [menu, setMenu] = useState<IMenu[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getMenu(search);
      setMenu(result);
    };
    fetchData();
  }, [search]);

  const category = (category: iCategory): React.ReactNode => {
    return (
      <span
        className={`bg-${category?.bg_color || "purple-100"} text-${category?.text_color || "purple-800"} text-sm font-medium px-2.5 py-0.5 rounded-full`}
      >
        {category?.name}
      </span>
    );
  };

  const calculateDiscountPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-figtree">
      <Sidebar />

      <main className="flex-1 p-4">
        <div className="bg-white rounded-lg p-4 border-t-4 border-t-primary shadow-md">
          <h4 className="text-xl font-bold mb-2">Menu Data</h4>
          <p className="text-sm text-secondary mb-4">
            This page displays menu data, allowing menus to view details,
            search, and manage menu items by adding, editing, or deleting them.
          </p>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center w-full max-w-md">
              <Search url={`/stan/menu`} search={search} />
            </div>
            <AddMenu />
          </div>

          {menu.length === 0 ? (
            <Alert>No data available</Alert>
          ) : (
            <div>
              {menu.map((data, index) => (
                <div
                  key={`keyMenu${index}`}
                  className="flex flex-wrap shadow m-2 rounded-lg"
                >
                  <div className="w-full md:w-1/12 p-2">
                    <small className="font-bold text-primary">Picture</small>
                    <Image
                      width={40}
                      height={40}
                      src={`${BASE_IMAGE_MENU}/${data.picture}`}
                      className="rounded-sm"
                      alt="preview"
                      unoptimized
                    />
                  </div>

                  <div className="w-full md:w-2/12 p-2 capitalize">
                    <small className="font-bold text-primary">Name</small>
                    <br />
                    {data.name}
                  </div>

                  <div className="w-full md:w-1/12 p-2 capitalize">
                    <small className="font-bold text-primary">Price</small>
                    <br />

                    {data.diskon && data.diskon.is_active ? (
                      <div>
                        {/* harga asli dicoret */}
                        <p className="text-sm text-gray-400 line-through">
                          Rp {data.price.toLocaleString("id-ID")}
                        </p>

                        {/* harga setelah diskon */}
                        <p className="text-base font-bold text-red-600">
                          Rp{" "}
                          {calculateDiscountPrice(
                            data.price,
                            data.diskon.persentase_diskon,
                          ).toLocaleString("id-ID")}
                        </p>

                        {/* badge diskon */}
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                          -{data.diskon.persentase_diskon}%
                        </span>
                      </div>
                    ) : (
                      <p className="font-medium">
                        Rp {data.price.toLocaleString("id-ID")}
                      </p>
                    )}
                  </div>

                  <div className="w-full md:w-5/12 p-2 capitalize">
                    <small className="font-bold text-primary">
                      Description
                    </small>
                    <br />
                    {data.description}
                  </div>

                  <div className="w-full md:w-1/12 p-2 capitalize">
                    <small className="font-bold text-primary">Category</small>
                    <br />
                    {category(data.category)}
                  </div>

                  <div className="w-full md:w-2/12 p-2">
                    <small className="font-bold text-primary">Action</small>
                    <br />
                    <AddDiskonMenu
                      menu={data}
                      onSuccess={async () => {
                        const result = await getMenu(search);
                        setMenu(result);
                      }}
                    />
                    <EditMenu selectedMenu={data} />
                    <DeleteMenu selectedMenu={data} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MenuPage;
