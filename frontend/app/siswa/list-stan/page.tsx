"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { get } from "@/lib/api-bridge";
import { IStan } from "@/app/types";
import { getCookies } from "@/lib/server-cookies";
import { BASE_API_URL } from "@/global";
import DatePickerComponent from "@/components/dateTime";
import Search from "@/components/menu/SearchMenu";
import Alert from "@/components/alert/page";
import CardStan from "@/components/cardStan";
import Navbar from "@/components/navbarSection";

export default function ListStanPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const [totalStan, setTotalStan] = useState<string>("0");
  const [loading, setLoading] = useState(true);
  const [stan, setStan] = useState<IStan[]>([]);

  const getStan = async (search: string): Promise<IStan[]> => {
    try {
      const TOKEN = (await getCookies("token")) ?? "";
      const url = `${BASE_API_URL}/stan/list-stan?search=${search}`;
      const { data } = await get(url, TOKEN);
      let result: IStan[] = [];
      if (data?.status) result = [...data.data];
      setTotalStan(data.totalStans);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getStan(search);
      setStan(result);
      setLoading(false);
    };
    fetchData();
  }, [search]);

  return (
    <div className="flex py-10 w-full h-max bg-[#f5f5f5] flex-col gap-8">
      <Navbar/>
      <div>
        <DatePickerComponent />
      </div>
      <div className="flex items-center w-full flex-grow">
        <Search url={`/siswa/list-stan`} search={search} />
      </div>

      {loading ? (
                <p>Loading.....</p>
              ) : stan.length === 0 && !loading ? (
                <Alert>No data available</Alert>
              ) : (
                <div className=" flex flex-wrap justify-center gap-4">
                  {stan.map((data, index) => (
                    <div key={index} className=" shadow m-2">
                      <CardStan
                        id={data.id}
                        title={data.nama}
                        price={data.no_telp}

                      />
                    </div>
                  ))}
                </div>
              )}

    </div>
  );
}
