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
          className={`bg-${category?.bg_color || "purple-100"} text-${category?.text_color || "purple-800"} text-sm font-medium px-2.5 py-0.5 rounded-full`}
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
        <>
          <s>{rupiah(price)}</s> <span>{rupiah(finalPrice)}</span>
        </>
      );
    }

    return <span>{rupiah(price)}</span>;
  };

  return (
    <div className="text-hitamGaHitam font-poppins">
      <div className="bg-[#ffffff] flex flex-col rounded-lg py-3 overflow-hidden shadow-md w-52 min-h-[250px]">
        <div className="flex flex-col h-full">
          <div className="rounded-lg w-36 h-32 overflow-hidden relative mx-auto bg-[#F7F7F7]">
            <Image
              src={image ? `${BASE_IMAGE_MENU}/${image}` : "/menu/menu1.jpg"}
              alt="makanan"
              layout="fill"
              objectFit="cover"
              className="rounded-lg p-2"
            />
          </div>

          <div className="flex-grow flex flex-col justify-between mt-2 px-3">
            <h1 className="capitalize text-lg">{title}</h1>

            <div className="flex justify-between gap-2 mt-2">
              {category(cat)}
              <h1 className="text-gray-700 text-lg">
                {formatFinalPrice(price, diskon, final_price)}
              </h1>
            </div>
          </div>

          <div className="w-full flex justify-end mt-4 px-3">
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md"
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
