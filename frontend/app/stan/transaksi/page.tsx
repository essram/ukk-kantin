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
import Sidebar from "@/components/sidebar";

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

const formatRupiah = (number: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

const TransaksiPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const stan_id = Cookies.get("stan_id") || 0;

  const [history, setHistory] = useState<OrderResponse[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getHistory(search, Number(stan_id));
      setHistory(result);
      
      // Extract unique months from data
      const months = new Set<string>();
      result.forEach((item: OrderResponse) => {
        if (item.createdAt) {
          const monthKey = format(new Date(item.createdAt), "yyyy-MM");
          months.add(monthKey);
        }
      });
      const sortedMonths = Array.from(months).sort().reverse();
      setAvailableMonths(sortedMonths);
      // Set default to first month
      if (sortedMonths.length > 0) {
        setSelectedMonth(sortedMonths[0]);
      }
    };
    fetchData();
  }, [search]);

  // Filter history by selected month
  const filteredHistory = selectedMonth
    ? history.filter((item) => {
        if (!item.createdAt) return false;
        const itemMonth = format(new Date(item.createdAt), "yyyy-MM");
        return itemMonth === selectedMonth;
      })
    : history;
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        <h1 className="font-bold text-3xl mt-10 text-center text-hitamGaHitam">
          Transaction History
        </h1>

        {/* Month Filter */}
        <div className="bg-white my-6 mx-6 p-4 rounded-lg shadow-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Month
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Months</option>
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {format(new Date(month + "-01"), "MMMM yyyy")}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white my-4 mx-6 p-6 rounded-lg h-max box-border text-gray-800 overflow-x-auto shadow-md">
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
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4">
                    <Alert>No data available</Alert>
                  </td>
                </tr>
              ) : (
                filteredHistory.map((data, index) => (
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
                      {formatRupiah(parseFloat(data.total_price))}
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
