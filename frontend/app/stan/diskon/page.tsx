"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import { BASE_API_URL } from "@/global";
import { post } from "@/lib/api-bridge";
import { getCookies } from "@/lib/server-cookies";
import Alert from "@/components/alert/page";

const CreateDiskonPage = () => {
  const [namaDiskon, setNamaDiskon] = useState("");
  const [persentase, setPersentase] = useState("");
  const [tanggalAwal, setTanggalAwal] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submit = async () => {
    try {
      setLoading(true);
      setMessage("");

      const token = (await getCookies("token")) ?? "";

      const { data } = await post(
        `${BASE_API_URL}/diskon`,
        {
          nama_diskon: namaDiskon,
          persentase_diskon: Number(persentase),
          tanggal_awal: tanggalAwal,
          tanggal_akhir: tanggalAkhir,
        },
        token,
      );

      if (data?.status) {
        setMessage("Diskon berhasil dibuat");
        setNamaDiskon("");
        setPersentase("");
        setTanggalAwal("");
        setTanggalAkhir("");
      }
    } catch (error) {
      setMessage("Gagal membuat diskon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-figtree">
      <Sidebar />

      <main className="flex-1 p-4">
        <div className="bg-white rounded-lg p-4 border-t-4 border-t-primary shadow-md max-w-xl">
          <h4 className="text-xl font-bold mb-2">Buat Diskon</h4>
          <p className="text-sm text-secondary mb-4">
            Halaman ini digunakan untuk membuat diskon menu.
          </p>

          {message && <Alert>{message}</Alert>}

          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold">Nama Diskon</label>
              <input
                type="text"
                value={namaDiskon}
                onChange={(e) => setNamaDiskon(e.target.value)}
                className="w-full border rounded p-2 mt-1"
                placeholder="Contoh: Diskon Ramadhan"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Persentase Diskon (%)
              </label>
              <input
                type="number"
                value={persentase}
                onChange={(e) => setPersentase(e.target.value)}
                className="w-full border rounded p-2 mt-1"
                placeholder="Contoh: 20"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Tanggal Mulai</label>
              <input
                type="date"
                value={tanggalAwal}
                onChange={(e) => setTanggalAwal(e.target.value)}
                className="w-full border rounded p-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Tanggal Berakhir</label>
              <input
                type="date"
                value={tanggalAkhir}
                onChange={(e) => setTanggalAkhir(e.target.value)}
                className="w-full border rounded p-2 mt-1"
              />
            </div>

            <button
              disabled={loading}
              onClick={submit}
              className="bg-primary hover:bg-primary/90 text-black px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : "Simpan Diskon"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateDiskonPage;
