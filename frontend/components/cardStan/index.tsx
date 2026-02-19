"use client";
import Image from "next/image";
import { BASE_IMAGE_MENU } from "@/global";
import { useRouter } from "next/navigation";
import { MdStorefront, MdChevronRight } from "react-icons/md"; // Tambahkan react-icons

export default function CardKantin({ id, image, title }: any) {
  const router = useRouter();

  const clickOrder = () => {
    router.push(`/siswa/menuOrder?id=${id}`);
  };

  return (
    <div className="font-figtree">
      <div
        onClick={clickOrder}
        className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 w-full md:w-72 overflow-hidden cursor-pointer"
      >
        <div className="relative w-full h-32 overflow-hidden">
          <Image
            src={image ? `${BASE_IMAGE_MENU}/${image}` : "/menu/kantin_default.jpg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-bold px-3 py-1 rounded-lg shadow-sm uppercase tracking-wider">
              {"Kantin"}
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-orange-500">
                <MdStorefront size={18} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Merchant
                </span>
              </div>
              <h1 className="capitalize text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-orange-500 transition-colors">
                {title}
              </h1>
            </div>

            <div className="bg-oren text-white  rounded-xl hover:bg-white hover:text-orange hover:border hover:border-orange-500 transition-all">
              <button className="px-4 py-2">Order</button>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-50">
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500">Buka 07:00 - 16:00</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-gray-300" />
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold text-green-600">
                Tersedia
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
