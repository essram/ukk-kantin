"use client"
import { IMenu } from "@/app/types";
import { useEffect, useState } from "react";
import { MdOutlineFastfood } from "react-icons/md";
import { PiBowlFood } from "react-icons/pi";
import { RiDrinks2Line } from "react-icons/ri";

export default function MenuCat() {
  const [menu, setMenu] = useState<IMenu[]>([]);
  return (
    <div className="flex gap-4">
          <div className="flex flex-col border-2 border-orange-500 w-32 h-32 px-4 py-2 rounded-lg my-5 bg-orange-500/5 justify-center">
            <div className="bg-orange-500 p-2 w-max rounded-full mb-3">
              <MdOutlineFastfood color="#ffffff" size={24} />
            </div>
            <h1 className="text-orange-500">All Menu</h1>
            <h3 className="text-hitamGaHitam/80 text-sm">
              {menu.length} Items
            </h3>
          </div>
          <div className="flex flex-col bg-white w-32 h-32 px-4 py-2 rounded-lg my-5 justify-center">
            <div className="bg-[#f7f7f7] p-2 w-max rounded-full mb-3">
              <PiBowlFood color="#000000" size={24} />
            </div>
            <h1 className="text-hitamGaHitam">Food</h1>
            <h3 className="text-hitamGaHitam/80 text-sm">
              {menu.length} Items
            </h3>
          </div>
          <div className="flex flex-col bg-white w-32 h-32 px-4 py-2 rounded-lg my-5 justify-center">
            <div className="bg-[#f7f7f7] p-2 w-max rounded-full mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M160-120q-33 0-56.5-23.5T80-200v-120h800v120q0 33-23.5 56.5T800-120H160Zm0-120v40h640v-40H160Zm320-180q-36 0-57 20t-77 20q-56 0-76-20t-56-20q-36 0-57 20t-77 20v-80q36 0 57-20t77-20q56 0 76 20t56 20q36 0 57-20t77-20q56 0 77 20t57 20q36 0 56-20t76-20q56 0 79 20t55 20v80q-56 0-75-20t-55-20q-36 0-58 20t-78 20q-56 0-77-20t-57-20ZM80-560v-40q0-115 108.5-177.5T480-840q183 0 291.5 62.5T880-600v40H80Zm400-200q-124 0-207.5 31T166-640h628q-23-58-106.5-89T480-760Zm0 520Zm0-400Z" />
              </svg>
            </div>
            <h1 className="text-hitamGaHitam">Snack</h1>
            <h3 className="text-hitamGaHitam/80 text-sm">
              {menu.length} Items
            </h3>
          </div>
          <div className="flex flex-col bg-white w-32 h-32 px-4 py-2 rounded-lg my-5 justify-center">
            <div className="bg-[#f7f7f7] p-2 w-max rounded-full mb-3">
              <RiDrinks2Line color="#000000" size={24} />
            </div>
            <h1 className="text-hitamGaHitam">Drink</h1>
            <h3 className="text-hitamGaHitam/80 text-sm">
              {menu.length} Items
            </h3>
          </div>
        </div>
  )
}