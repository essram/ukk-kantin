"use client";
import Image from "next/image";
import { BASE_IMAGE_MENU } from "@/global";
import { useRouter } from "next/navigation";

export default function CardKantin({
  id,
  image,
  title,
  cat,
  price,
  
}: any) {

    const router = useRouter();
  const clickOrder = () => {
    router.push(`/siswa/menuOrder?id=${id}`);
  };

  const category = (category: string): React.ReactNode => {
    const categories = {
      FOOD: "bg-blue-100 text-blue-700",
      SNACK: "bg-red-100 text-red-700",
      DRINK: "bg-green-100 text-green-700",
    };
    return (
      <span
        className={`${
          categories[category] || "bg-gray-100 text-gray-700"
        } text-xs font-semibold px-3 py-1 rounded-full`}
      >
        {category}
      </span>
    );
  };

  const rupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="font-poppins">
      <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-56 min-h-[280px] flex flex-col overflow-hidden">
        
        {/* Image */}
        <div className="relative w-full h-36 bg-gray-100 overflow-hidden">
          <Image
            src={image ? `${BASE_IMAGE_MENU}/${image}` : "/menu/menu1.jpg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-4">
          <h1 className="capitalize text-base font-semibold line-clamp-2">
            {title}
          </h1>

          <div className="flex items-center justify-between mt-2">
            {category(cat)}
            <span className="text-sm font-bold text-gray-800">
              {rupiah(price)}
            </span>
          </div>

          {/* Spacer */}
          <div className="flex-grow" />

          {/* Action */}
          <button
            onClick={clickOrder}
            className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 rounded-xl transition-colors"
          >
            + Order
          </button>
        </div>
      </div>
    </div>
  );
}
