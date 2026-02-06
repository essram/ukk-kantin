"use client";

import { OrderResponse } from "@/app/types";
import { BASE_API_URL } from "@/global";
import { getCookies } from "@/lib/server-cookies";
import { get } from "@/lib/api-bridge";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Alert from "@/components/alert/page";
import Link from "next/link";
import { format } from "date-fns";
import Cookies from "js-cookie";

const getHistory = async (search: string, idStan: number): Promise<OrderResponse[]> => {
  try {
    const TOKEN = (await getCookies("token")) ?? "";
    const url = `${BASE_API_URL}/order/history?search=${search}&id_stan=${idStan}`;
    const { data } = await get(url, TOKEN);
    return data?.status ? [...data.data] : [];
  } catch (error) {
    console.log(error);
    return [];  
  }
};
const TransaksiPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const stan_id = Cookies.get("stan_id") || 0;

  const [history, setHistory] = useState<OrderResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getHistory(search, Number(stan_id));
      setHistory(result);
    };
    fetchData();
  }, [search]);
  // setTimeout(() => window.location.reload(), 500);
  return (
    <div>
      <div className="flex flex-col justify-center">
        <h1 className="font-bold text-3xl mt-10 text-center text-hitamGaHitam">
          Transaction History
        </h1>
        <div className="bg-white my-10 p-6 rounded-lg w-full h-max box-border text-gray-800 overflow-x-auto shadow-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-gray-600 space-x-4">
                {[
                  "#",
                  "Date & Time",
                  "Customer Name",
                  "Order Status",
                  "Total Payment",
                  "Payment Status",
                  "Orders",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-sm font-medium bg-[#f7f7f7] rounded-full w-max"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-center">
              {history.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4">
                    <Alert>No data available</Alert>
                  </td>
                </tr>
              ) : (
                history.map((data, index) => (
                  <tr key={index} className="border-b border-gray-200 text-sm">
                    <td className="px-4 py-4 w-max">{String(index + 1)}</td>
                    <td className="px-4 py-4 w-max">
                      {data.createdAt
                        ? format(
                            new Date(data.createdAt),
                            "dd/MM/yyyy - HH:mm a"
                          )
                        : "-"}
                    </td>
                    <td className="px-4 py-4 w-max capitalize">
                      {data.customer}
                    </td>
                    <td className="px-4 py-4 w-max">{data.status}</td>
                    <td className="px-4 py-4 w-max">
                      USD {parseFloat(data.total_price).toFixed(2)}
                    </td>
                    <td className="px-4 py-4 w-max">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          data.PaymentOrder?.status === "LUNAS"
                            ? "text-green-600 bg-green-100"
                            : data.PaymentOrder?.status === "BELUM_LUNAS"
                            ? "text-orange-600 bg-orange-100"
                            : "text-red-600 bg-red-100"
                        }`}
                      >
                        {data.PaymentOrder?.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 w-max">
                      <Link
                        href={`/stan/transaksi/${data.id}`}
                        className="text-blue-500 hover:underline"
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransaksiPage;
