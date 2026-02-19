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
    <div className="flex flex-col min-h-screen bg-[#f5f5f5] font-figtree">
      <Navbar />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        <div className="flex flex-col mt-24 md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800">
              Daftar Stan Kantin
            </h1>
            <p className="text-sm text-gray-500">
              Pilih kantin favoritmu dan mulai memesan.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <DatePickerComponent />
          </div>
        </div>

        <div className="w-full">
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
            <Search url={`/siswa/list-stan`} search={search} />
          </div>
        </div>

        <section className="w-full">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oren"></div>
              <p className="mt-4 text-gray-500 font-medium">
                Mencari stan terbaik...
              </p>
            </div>
          ) : stan.length === 0 && !loading ? (
            <div className="py-20 text-center bg-white rounded-3xl shadow-sm border border-dashed border-gray-300">
              <Alert>Maaf, tidak ada stan yang ditemukan.</Alert>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
              {stan.map((data, index) => (
                <div
                  key={index}
                  className="w-full flex justify-center transform transition duration-300 hover:-translate-y-2"
                >
                  <CardStan
                    id={data.id}
                    title={data.nama}
                    image={data.image}
                    price={Number(data.no_telp) || 0}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="py-6 text-center text-gray-400 text-sm">
        © 2026 NomNom - Platform Pemesanan Digital
      </footer>
    </div>
  );
}
