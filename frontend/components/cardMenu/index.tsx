"use client";
import Image from "next/image";
import { BASE_IMAGE_MENU } from "@/global";
import { iCategory } from "@/app/types";

export default function Test({
  id,
  image,
  title,
  cat,
  price,
  orderClick,
  diskon,
  final_price,
}: any) {
  const clickOrder = () => {
    orderClick({ id, title, image, price, finalPrice: final_price, diskon });
  };

  type Diskon = {
    persentase_diskon: number;
  } | null;

  const category = (category: iCategory): React.ReactNode => {
    return (
      <span
        className={`bg-${category?.bg_color || "green-100"} text-${category?.text_color || "green-800"} text-[10px] md:text-xs font-semibold px-2 py-1 rounded-md inline-block`}
      >
        {category?.name}
      </span>
    );
  };

  const rupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatFinalPrice = (
    price: number,
    diskon: Diskon,
    finalPrice: number,
  ) => {
    if (diskon) {
      return (
        <div className="flex flex-col">
          <s className="text-gray-400 text-xs md:text-sm decoration-red-500">
            {rupiah(price)}
          </s>
          <span className="text-orange-600 font-bold text-sm md:text-base">
            {rupiah(finalPrice)}
          </span>
        </div>
      );
    }

    return <span className="font-bold text-gray-800 text-sm md:text-base">{rupiah(price)}</span>;
  };

  return (
    <div className="font-poppins p-2">
      <div className="bg-white flex flex-col rounded-2xl overflow-hidden shadow-lg border border-gray-100 w-40 sm:w-44 md:w-52 h-full">
        <div className="p-3">
            <div className="rounded-xl w-full h-28 sm:h-32 md:h-36 overflow-hidden relative bg-[#F7F7F7]">
                <Image
                src={image ? `${BASE_IMAGE_MENU}/${image}` : "/menu/menu1.jpg"}
                alt={title}
                fill
                className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                unoptimized
                />
                {diskon && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-2 py-1 rounded-bl-lg font-bold">
                        -{diskon.persentase_diskon}%
                    </div>
                )}
            </div>
        </div>

        <div className="flex flex-col flex-grow px-3 pb-3">
          <h1 className="capitalize text-sm md:text-base font-semibold text-gray-800 line-clamp-1">
            {title}
          </h1>
          
          <div className="mt-1">
             {category(cat)}
          </div>

          <div className="flex justify-between items-end mt-3 gap-1">
            <div className="flex-grow">
               {formatFinalPrice(price, diskon, final_price)}
            </div>
            
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg shadow-sm text-xs md:text-sm font-medium transition-colors"
              onClick={clickOrder}
            >
              Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}