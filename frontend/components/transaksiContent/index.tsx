import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { format } from "date-fns";
import { OrderResponse } from "@/app/types";
import { getCookies } from "@/lib/server-cookies";
import { get } from "@/lib/api-bridge";
import { BASE_API_URL } from "@/global";
import Link from "next/link";

const formatRupiah = (number: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

export default function TransaksiContent() {
  const [history, setHistory] = useState<OrderResponse[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);
  const siswa_id = Cookies.get("id_siswa") || 0;

  useEffect(() => {
    const fetchHistory = async () => {
      const TOKEN = (await getCookies("token")) ?? "";
      const url = `${BASE_API_URL}/order/history?id=${siswa_id}`;
      const { data } = await get(url, TOKEN);
      if (data?.status) {
        setHistory(data.data);
        // Extract unique months from data
        const months = new Set<string>();
        data.data.forEach((item: OrderResponse) => {
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
      }
    };
    fetchHistory();
  }, [siswa_id]);

  // Filter history by selected month
  const filteredHistory = selectedMonth
    ? history.filter((item) => {
        if (!item.createdAt) return false;
        const itemMonth = format(new Date(item.createdAt), "yyyy-MM");
        return itemMonth === selectedMonth;
      })
    : history;

  return (
    <div className="flex flex-col gap-4">
      {/* Month Filter */}
      <div className="bg-white rounded-lg shadow-md p-4">
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

      {/* Transaction Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3">Date</th>
              <th className="p-3">Order Status</th>
              <th className="p-3">Payment Status</th>
              <th className="p-3">Total</th>
              <th className="p-3">Detail</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.length > 0 ? (
              filteredHistory.map((item, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-3">
                    {item.createdAt
                      ? format(new Date(item.createdAt), "dd MMM yyyy")
                      : "-"}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-sm font-medium">
                      {item.status || "-"}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-800 text-sm font-medium">
                      {item.PaymentOrder?.status || "-"}
                    </span>
                  </td>
                  <td className="p-3">{formatRupiah(item.total_price)}</td>
                  <Link
                    type="button"
                    href={`/siswa/transaksi/${item.id}`}
                    className="p-3 underline"
                  >
                    Detail
                  </Link>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-3 text-center text-gray-500">
                  No transactions found for this month
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}