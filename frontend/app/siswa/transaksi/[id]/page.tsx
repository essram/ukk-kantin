"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { get } from "@/lib/api-bridge";
import { getCookies } from "@/lib/server-cookies";
import { BASE_API_URL } from "@/global";
import { OrderResponse } from "@/app/types";

pdfMake.vfs = pdfFonts.vfs;

const getOrder = async (id: string): Promise<OrderResponse | null> => {
  try {
    const TOKEN = (await getCookies("token")) ?? "";
    const url = `${BASE_API_URL}/order/history/${id}`;
    const { data } = await get(url, TOKEN);
    return data?.status ? data.data : null;
  } catch (error) {
    console.error(error);
    return null;
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

export default function Details() {
  const [order, setOrder] = useState<OrderResponse | null>(null);
  
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const result = await getOrder(id);
        if (result) {
          setOrder(result);
        }
      }
    };
    fetchData();
  }, [id]);

  const generateInvoice = () => {
    if (!order) return;
    const totalFromItems = order.transaction_detail.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const docDefinition = {
      content: [
        { text: "INVOICE", style: "header" },
        { text: `Invoice ID: ${order.id}`, style: "subheader" },
        { text: `Customer: ${order.customer}`, margin: [0, 10, 0, 10] },
        {
          table: {
            headerRows: 1,
            widths: ["*", "auto", "auto", "auto"],
            body: [
              ["Item", "Quantity", "Unit Price", "Subtotal"],
              ...order.transaction_detail.map((item) => [
                item.menu.name,
                item.quantity.toString(),
                formatRupiah(item.price),
                formatRupiah(item.quantity * item.price),
              ]),
            ],
          },
          margin: [0, 10, 0, 10],
        },
        { text: `Total: ${formatRupiah(totalFromItems)}`, style: "total" },
        { text: `Status: ${order.status}`, margin: [0, 10, 0, 10] },
        {
          text: `Payment: ${order.PaymentOrder?.status}`,
          margin: [0, 5, 0, 10],
        },
        order.PaymentOrder?.paymentMethod
          ? {
              text: `Metode Pembayaran: ${order.PaymentOrder.paymentMethod.nama}`,
              margin: [0, 5, 0, 10],
            }
          : {},
      ],
      styles: {
        header: { fontSize: 18, bold: true, alignment: "center" },
        subheader: { fontSize: 14, bold: true },
        total: { fontSize: 14, bold: true, alignment: "right" },
      },
    };
    pdfMake.createPdf(docDefinition).download(`Invoice_${order.id}.pdf`);
  };

  const itemsTotal = order ? order.transaction_detail.reduce((sum, item) => sum + item.quantity * item.price, 0) : 0;

  return order ? (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <button
        onClick={() => router.back()}
        className="flex items-center text-hitamGaHitam hover:text-hitamGaHitam/60 transition-all mb-4"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <h2 className="text-2xl font-bold text-center">Order Details</h2>
      <p className="mt-2 text-gray-700">Order ID: {order.id}</p>
      <p className="text-gray-700 capitalize">Customer: {order.customer}</p>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Order Items </h3>
        <ul className="list-disc pl-5">
          {order.transaction_detail.map((item) => (
            <li key={item.id} className="text-gray-600">
              {item.menu.name} - {item.quantity} x{" "}
              {formatRupiah(item.price)} ={" "}
              <strong>{formatRupiah(item.quantity * item.price)}</strong>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Total Price</h3>
        <p className="text-xl font-bold text-right">
          {formatRupiah(itemsTotal)}
        </p>
      </div>
      <div className="mt-4 flex space-x-4">
        <button
          onClick={generateInvoice}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
        >
          Download Invoice
        </button>
      </div>
    </div>
  ) : (
    <p className="text-center text-gray-500">Loading order data...</p>
  );
}
	

