import Image from "next/image";
import menuImages from "@/lib/menuImages";
const Menu = () => {
  return (
    <div className="bg-putihGaPutih font-poppins">
      {/* parent paling atas */}
      <div className="flex flex-row position-relative">
        <div className="basis-2/3">
          {/* header start */}
          <div className="flex flex-row items-center justify-between mx-6">
            <h1 className="text-hitamGaHitam text-2xl font-bold">
              Special Discount Today
            </h1>
            <h1 className="bg-white py-3 px-4 text-hitamGaHitam text-sm rounded-full">
              Ends in{" "}
              <span className="text-red-500 font-semibold text-sm">
                03:10:09
              </span>
            </h1>
          </div>
          {/* header end */}
          {/* menu diskon start */}
          <div className="flex flex-row mx-6 mt-6">
            <div className="basis-1/4 px-1">
              <div className="p-2 shadow-md rounded-lg h-full bg-white">
                <div>
                  <Image
                    className="rounded-lg"
                    src={menuImages.Menu1}
                    alt=""
                    width={0}
                    height={0}
                  />
                </div>
                <div className="flex flex-row items-center">
                  <div className="flex flex-col">
                    <h1 className="text-hitamGaHitam font-semibold p-1">
                      Salad
                    </h1>
                    <p className="text-sm text-hitamGaHitam p-1">
                      <span className="bg-red-400/40 p-1 text-red-500 rounded-lg">
                        15%
                      </span>
                      <span className="line-through text-hitamGaHitam/40">
                        Rp.115.000,00
                      </span>
                    </p>
                    <p className="text-hitamGaHitam p-1 font-semibold">
                      Rp.100.000,00
                    </p>
                  </div>
                  <div className="flex flex-row bg-hitamGaHitam rounded-full mt-12 ml-3 hover:bg-slate-700 hover:text-slate-400 hover:transition-all cursor-pointer">
                    <h1 className="text-white text-sm py-2 px-5">Order</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-1/4 px-1">
              <div className="p-2 shadow-md rounded-lg h-full bg-white">
                <div>
                  <Image
                    className="rounded-lg"
                    src={menuImages.Menu2}
                    alt=""
                    width={0}
                    height={0}
                  />
                </div>
                <div className="flex flex-row items-center">
                  <div className="flex flex-col">
                    <h1 className="text-hitamGaHitam font-semibold p-1">
                      Burger
                    </h1>
                    <p className="text-sm text-hitamGaHitam p-1">
                      <span className="bg-red-400/40 p-1 text-red-500 rounded-lg">
                        10%
                      </span>
                      <span className="line-through text-hitamGaHitam/40">
                        Rp.100.000,00
                      </span>
                    </p>
                    <p className="text-hitamGaHitam p-1 font-semibold">
                      Rp.80.000,00
                    </p>
                  </div>
                  <div className="flex flex-row bg-hitamGaHitam rounded-full mt-12 ml-3 hover:bg-slate-700 hover:text-slate-400 hover:transition-all cursor-pointer">
                    <h1 className="text-white text-sm py-2 px-5">Order</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-1/4 px-1">
              <div className="p-2 shadow-md rounded-lg h-full bg-white">
                <div>
                  <Image
                    className="rounded-lg"
                    src={menuImages.Menu3}
                    alt=""
                    width={0}
                    height={0}
                  />
                </div>
                <div className="flex flex-row items-center">
                  <div className="flex flex-col">
                    <h1 className="text-hitamGaHitam font-semibold p-1">
                      Dessert
                    </h1>
                    <p className="text-sm text-hitamGaHitam p-1">
                      <span className="bg-red-400/40 p-1 text-red-500 rounded-lg">
                        10%
                      </span>
                      <span className="line-through text-hitamGaHitam/40">
                        Rp.55.000,00
                      </span>
                    </p>
                    <p className="text-hitamGaHitam p-1 font-semibold">
                      Rp.45.000,00
                    </p>
                  </div>
                  <div className="flex flex-row bg-hitamGaHitam rounded-full mt-12 ml-3 hover:bg-slate-700 hover:text-slate-400 hover:transition-all cursor-pointer">
                    <h1 className="text-white text-sm py-2 px-5">Order</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-1/4 px-1">
              <div className="p-2 shadow-md rounded-lg h-full bg-white">
                <div>
                  <Image
                    className="rounded-lg"
                    src={menuImages.Menu4}
                    alt=""
                    width={0}
                    height={0}
                  />
                </div>
                <div className="flex flex-row items-center">
                  <div className="flex flex-col">
                    <h1 className="text-hitamGaHitam font-semibold p-1">
                      Beef
                    </h1>
                    <p className="text-sm text-hitamGaHitam p-1">
                      <span className="bg-red-400/40 p-1 text-red-500 rounded-lg">
                        15%
                      </span>
                      <span className="line-through text-hitamGaHitam/40">
                        Rp.115.000,00
                      </span>
                    </p>
                    <p className="text-hitamGaHitam p-1 font-semibold">
                      Rp.100.000,00
                    </p>
                  </div>
                  <div className="flex flex-row bg-hitamGaHitam rounded-full mt-12 ml-3 hover:bg-slate-700 hover:text-slate-400 hover:transition-all cursor-pointer">
                    <h1 className="text-white text-sm py-2 px-5">Order</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* menu diskon end */}
          {/* our menu */}
          {/* judulnya */}
          <div className="flex flex-row items-center justify-between mt-6 mx-6">
            <h1 className="text-hitamGaHitam text-2xl font-bold">
              Explore Our Best Menu
            </h1>
            <h1 className=" py-3 px-4 text-hitamGaHitam text-sm rounded-full">
              View All
            </h1>
          </div>
          {/* judul end */}\{/* kategori start */}
          <div className="flex justify-evenly flex-nowrap text-hitamGaHitam items-center ml-2 mr-2">
            <div className="border-2 px-4 py-2  text-sm rounded-full bg-hitamGaHitam text-white">
              All
            </div>
            <div className="border-2 px-4 py-2  text-sm rounded-full cursor-pointer hover:text-hitamGaHitam/70 transition-all">
              Dessert
            </div>
            <div className="border-2 px-4 py-2  text-sm rounded-full cursor-pointer hover:text-hitamGaHitam/70 transition-all">
              Beverage
            </div>
            <div className="border-2 px-4 py-2  text-sm rounded-full cursor-pointer hover:text-hitamGaHitam/70 transition-all">
              Snack
            </div>
            <div className="border-2 px-4 py-2  text-sm rounded-full cursor-pointer hover:text-hitamGaHitam/70 transition-all">
              Fast Food
            </div>
            <div className="border-2 px-4 py-2  text-sm rounded-full cursor-pointer hover:text-hitamGaHitam/70 transition-all">
              Coffee
            </div>
            <div className="border-2 px-4 py-2  text-sm rounded-full cursor-pointer hover:text-hitamGaHitam/70 transition-all">
              Indonesian
            </div>
            <div className="border-2 px-4 py-2  text-sm rounded-full cursor-pointer hover:text-hitamGaHitam/70 transition-all">
              International
            </div>
            <div className="border-2 px-4 py-2  text-sm rounded-full cursor-pointer hover:text-hitamGaHitam/70 transition-all flex flex-row items-center">
              <span className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="22px"
                  fill="rgb(41,48,58)"
                >
                  <path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z" />
                </svg>
              </span>
              Filter
            </div>
          </div>
          {/* kategori end */}
          <div className="flex flex-row mx-6 mt-6">
            <div className="basis-1/4 px-1">
              <div className="p-2 shadow-md rounded-lg h-full bg-white">
                <div>
                  <Image
                    className="rounded-lg"
                    src={menuImages.Menu1}
                    alt=""
                    width={0}
                    height={0}
                  />
                </div>
                <div className="flex flex-row items-center">
                  <div className="flex flex-col">
                    <h1 className="text-hitamGaHitam font-semibold p-1">
                      Salad
                    </h1>
                    <p className="px-1 text-slate-400 text-xs">
                      Delicious Salad
                    </p>
                    <p className="text-hitamGaHitam p-1 font-semibold">
                      Rp.100.000,00
                    </p>
                  </div>
                  <div className="flex flex-row bg-hitamGaHitam rounded-full mt-12 ml-3 hover:bg-slate-700 hover:text-slate-400 hover:transition-all cursor-pointer">
                    <h1 className="text-white text-sm py-2 px-5">Order</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-1/4 px-1">
              <div className="p-2 shadow-md rounded-lg h-full bg-white">
                <div>
                  <Image
                    className="rounded-lg"
                    src={menuImages.Menu5}
                    alt=""
                    width={0}
                    height={0}
                  />
                </div>
                <div className="flex flex-row items-center">
                  <div className="flex flex-col">
                    <h1 className="text-hitamGaHitam font-semibold p-1">Mie</h1>
                    <p className="px-1 text-slate-400 text-xs">Mie Enak</p>
                    <p className="text-hitamGaHitam p-1 font-semibold">
                      Rp.100.000,00
                    </p>
                  </div>
                  <div className="flex flex-row bg-hitamGaHitam rounded-full mt-12 ml-3 hover:bg-slate-700 hover:text-slate-400 hover:transition-all cursor-pointer">
                    <h1 className="text-white text-sm py-2 px-5">Order</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-1/4 px-1">
              <div className="p-2 shadow-md rounded-lg h-full bg-white">
                <div>
                  <Image
                    className="rounded-lg"
                    src={menuImages.Menu6}
                    alt=""
                    width={0}
                    height={0}
                  />
                </div>
                <div className="flex flex-row items-center">
                  <div className="flex flex-col">
                    <h1 className="text-hitamGaHitam font-semibold p-1">
                      Pizza
                    </h1>
                    <p className="px-1 text-slate-400 text-xs">Pizza enakk</p>
                    <p className="text-hitamGaHitam p-1 font-semibold">
                      Rp.100.000,00
                    </p>
                  </div>
                  <div className="flex flex-row bg-hitamGaHitam rounded-full mt-12 ml-3 hover:bg-slate-700 hover:text-slate-400 hover:transition-all cursor-pointer">
                    <h1 className="text-white text-sm py-2 px-5">Order</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-1/4 px-1">
              <div className="p-2 shadow-md rounded-lg h-full bg-white">
                <div>
                  <Image
                    className="rounded-lg"
                    src={menuImages.Menu7}
                    alt=""
                    width={0}
                    height={0}
                  />
                </div>
                <div className="flex flex-row items-center">
                  <div className="flex flex-col">
                    <h1 className="text-hitamGaHitam font-semibold p-1">Kue</h1>
                    <p className="px-1 text-slate-400 text-xs">Kue enakk</p>
                    <p className="text-hitamGaHitam p-1 font-semibold">
                      Rp.100.000,00
                    </p>
                  </div>
                  <div className="flex flex-row bg-hitamGaHitam rounded-full mt-12 ml-3 hover:bg-slate-700 hover:text-slate-400 hover:transition-all cursor-pointer">
                    <h1 className="text-white text-sm py-2 px-5">Order</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row mx-6 mt-6">
            <div className="basis-1/4 px-1">
              <div className="p-2 shadow-md rounded-lg h-full bg-white">
                <div>
                  <Image
                    className="rounded-lg"
                    src={menuImages.Menu1}
                    alt=""
                    width={0}
                    height={0}
                  />
                </div>
                <div className="flex flex-row items-center">
                  <div className="flex flex-col">
                    <h1 className="text-hitamGaHitam font-semibold p-1">
                      Salad
                    </h1>
                    <p className="px-1 text-slate-400 text-xs">Salad enakk</p>
                    <p className="text-hitamGaHitam p-1 font-semibold">
                      Rp.100.000,00
                    </p>
                  </div>
                  <div className="flex flex-row bg-hitamGaHitam rounded-full mt-12 ml-3 hover:bg-slate-700 hover:text-slate-400 hover:transition-all cursor-pointer">
                    <h1 className="text-white text-sm py-2 px-5">Order</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-1/4 px-1">
              <div className="p-2 shadow-md rounded-lg h-full bg-white">
                <div>
                  <Image
                    className="rounded-lg"
                    src={menuImages.Menu5}
                    alt=""
                    width={0}
                    height={0}
                  />
                </div>
                <div className="flex flex-row items-center">
                  <div className="flex flex-col">
                    <h1 className="text-hitamGaHitam font-semibold p-1">Mie</h1>
                    <p className="px-1 text-slate-400 text-xs">Mie enakk</p>
                    <p className="text-hitamGaHitam p-1 font-semibold">
                      Rp.100.000,00
                    </p>
                  </div>
                  <div className="flex flex-row bg-hitamGaHitam rounded-full mt-12 ml-3 hover:bg-slate-700 hover:text-slate-400 hover:transition-all cursor-pointer">
                    <h1 className="text-white text-sm py-2 px-5">Order</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-1/4 px-1">
              <div className="p-2 shadow-md rounded-lg h-full bg-white">
                <div>
                  <Image
                    className="rounded-lg"
                    src={menuImages.Menu6}
                    alt=""
                    width={0}
                    height={0}
                  />
                </div>
                <div className="flex flex-row items-center">
                  <div className="flex flex-col">
                    <h1 className="text-hitamGaHitam font-semibold p-1">
                      Pizza
                    </h1>
                    <p className="px-1 text-slate-400 text-xs">Pizza enakk</p>
                    <p className="text-hitamGaHitam p-1 font-semibold">
                      Rp.100.000,00
                    </p>
                  </div>
                  <div className="flex flex-row bg-hitamGaHitam rounded-full mt-12 ml-3 hover:bg-slate-700 hover:text-slate-400 hover:transition-all cursor-pointer">
                    <h1 className="text-white text-sm py-2 px-5">Order</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-1/4 px-1">
              <div className="p-2 shadow-md rounded-lg h-full bg-white">
                <div>
                  <Image
                    className="rounded-lg"
                    src={menuImages.Menu7}
                    alt=""
                    width={0}
                    height={0}
                  />
                </div>
                <div className="flex flex-row items-center">
                  <div className="flex flex-col">
                    <h1 className="text-hitamGaHitam font-semibold p-1">Kue</h1>
                    <p className="px-1 text-slate-400 text-xs">Kue enakk</p>
                    <p className="text-hitamGaHitam p-1 font-semibold">
                      Rp.100.000,00
                    </p>
                  </div>
                  <div className="flex flex-row bg-hitamGaHitam rounded-full mt-12 ml-3 hover:bg-slate-700 hover:text-slate-400 hover:transition-all cursor-pointer">
                    <h1 className="text-white text-sm py-2 px-5">Order</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row mx-6 mt-6">
            <div className="basis-1/4 px-1">
              <div className="p-2 shadow-md rounded-lg h-full bg-white">
                <div>
                  <Image
                    className="rounded-lg"
                    src={menuImages.Menu1}
                    alt=""
                    width={0}
                    height={0}
                  />
                </div>
                <div className="flex flex-row items-center">
                  <div className="flex flex-col">
                    <h1 className="text-hitamGaHitam font-semibold p-1">
                      Salad
                    </h1>
                    <p className="px-1 text-slate-400 text-xs">Salad enakk</p>
                    <p className="text-hitamGaHitam p-1 font-semibold">
                      Rp.100.000,00
                    </p>
                  </div>
                  <div className="flex flex-row bg-hitamGaHitam rounded-full mt-12 ml-3 hover:bg-slate-700 hover:text-slate-400 hover:transition-all cursor-pointer">
                    <h1 className="text-white text-sm py-2 px-5">Order</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-1/4 px-1">
              <div className="p-2 shadow-md rounded-lg h-full bg-white">
                <div>
                  <Image
                    className="rounded-lg"
                    src={menuImages.Menu5}
                    alt=""
                    width={0}
                    height={0}
                  />
                </div>
                <div className="flex flex-row items-center">
                  <div className="flex flex-col">
                    <h1 className="text-hitamGaHitam font-semibold p-1">Mie</h1>
                    <p className="px-1 text-slate-400 text-xs">Mie enakk</p>
                    <p className="text-hitamGaHitam p-1 font-semibold">
                      Rp.100.000,00
                    </p>
                  </div>
                  <div className="flex flex-row bg-hitamGaHitam rounded-full mt-12 ml-3 hover:bg-slate-700 hover:text-slate-400 hover:transition-all cursor-pointer">
                    <h1 className="text-white text-sm py-2 px-5">Order</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-1/4 px-1">
              <div className="p-2 shadow-md rounded-lg h-full bg-white">
                <div>
                  <Image
                    className="rounded-lg"
                    src={menuImages.Menu6}
                    alt=""
                    width={0}
                    height={0}
                  />
                </div>
                <div className="flex flex-row items-center">
                  <div className="flex flex-col">
                    <h1 className="text-hitamGaHitam font-semibold p-1">
                      Pizza
                    </h1>
                    <p className="px-1 text-slate-400 text-xs">Pizza enakk</p>
                    <p className="text-hitamGaHitam p-1 font-semibold">
                      Rp.100.000,00
                    </p>
                  </div>
                  <div className="flex flex-row bg-hitamGaHitam rounded-full mt-12 ml-3 hover:bg-slate-700 hover:text-slate-400 hover:transition-all cursor-pointer">
                    <h1 className="text-white text-sm py-2 px-5">Order</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-1/4 px-1">
              <div className="p-2 shadow-md rounded-lg h-full bg-white">
                <div>
                  <Image
                    className="rounded-lg"
                    src={menuImages.Menu7}
                    alt=""
                    width={0}
                    height={0}
                  />
                </div>
                <div className="flex flex-row items-center">
                  <div className="flex flex-col">
                    <h1 className="text-hitamGaHitam font-semibold p-1">Kue</h1>
                    <p className="px-1 text-slate-400 text-xs">Pizza enakk</p>
                    <p className="text-hitamGaHitam p-1 font-semibold">
                      Rp.100.000,00
                    </p>
                  </div>
                  <div className="flex flex-row bg-hitamGaHitam rounded-full mt-12 ml-3 hover:bg-slate-700 hover:text-slate-400 hover:transition-all cursor-pointer">
                    <h1 className="text-white text-sm py-2 px-5">Order</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* div kanan */}
        <div className="basis-1/3 bg-white flex flex-col rounded-xl h-max w-full sticky top-0 ">
          <div className="m-4">
            <h1 className="text-hitamGaHitam text-xl font-semibold">
              Current Order
            </h1>
            <div>
              <div className="bg-slateBg rounded-lg flex flex-row h-full items-center mt-4">
                <Image
                  className="w-36 h-full rounded-2xl p-2"
                  src={menuImages.Menu1}
                  alt=""
                  width={0}
                  height={0}
                />
                <div>
                  <p className="text-hitamGaHitam ml-3 font-bold">Salad</p>
                  <div className="flex flex-row items-center h-full w-full">
                    <p className="text-orange-600 font-semibold ml-3">
                      Rp.100.000,00
                    </p>
                    <p className="text-hitamGaHitam border-2 border-hitamGaHitam rounded-lg px-2 ml-14 mr-1 cursor-pointer hover:bg-slate-200 transition-all">
                      -
                    </p>
                    <p className="text-hitamGaHitam px-2 mx-1 ">1</p>
                    <p className="text-white border-orange-600 hover:bg-orange-600/90 hover:border-orange-600/90 bg-orange-600 border-2 rounded-lg px-2 mx-1 cursor-pointer transition-all">
                      +
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-slateBg rounded-lg flex flex-row h-full items-center mt-4">
                <Image
                  className="w-36 h-full rounded-2xl p-2"
                  src={menuImages.Menu2}
                  alt=""
                  width={0}
                  height={0}
                />
                <div>
                  <p className="text-hitamGaHitam ml-3 font-bold">Salad</p>
                  <div className="flex flex-row items-center h-full w-full">
                    <p className="text-orange-600 font-semibold ml-3">
                      Rp.100.000,00
                    </p>
                    <p className="text-hitamGaHitam border-2 border-hitamGaHitam rounded-lg px-2 ml-14 mr-1 cursor-pointer hover:bg-slate-200 transition-all">
                      -
                    </p>
                    <p className="text-hitamGaHitam px-2 mx-1 ">1</p>
                    <p className="text-white border-orange-600 hover:bg-orange-600/90 hover:border-orange-600/90 bg-orange-600 border-2 rounded-lg px-2 mx-1 cursor-pointer transition-all">
                      +
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-slateBg rounded-lg flex flex-row h-full items-center mt-4">
                <Image
                  className="w-36 h-full rounded-2xl p-2"
                  src={menuImages.Menu3}
                  alt=""
                  width={0}
                  height={0}
                />
                <div>
                  <p className="text-hitamGaHitam ml-3 font-bold">Salad</p>
                  <div className="flex flex-row items-center h-full w-full">
                    <p className="text-orange-600 font-semibold ml-3">
                      Rp.100.000,00
                    </p>
                    <p className="text-hitamGaHitam border-2 border-hitamGaHitam rounded-lg px-2 ml-14 mr-1 cursor-pointer hover:bg-slate-200 transition-all">
                      -
                    </p>
                    <p className="text-hitamGaHitam px-2 mx-1 ">1</p>
                    <p className="text-white border-orange-600 hover:bg-orange-600/90 hover:border-orange-600/90 bg-orange-600 border-2 rounded-lg px-2 mx-1 cursor-pointer transition-all">
                      +
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-slateBg rounded-lg flex flex-row h-full items-center mt-4">
                <Image
                  className="w-36 h-full rounded-2xl p-2"
                  src={menuImages.Menu4}
                  alt=""
                  width={0}
                  height={0}
                />
                <div>
                  <p className="text-hitamGaHitam ml-3 font-bold">Salad</p>
                  <div className="flex flex-row items-center h-full w-full">
                    <p className="text-orange-600 font-semibold ml-3">
                      Rp.100.000,00
                    </p>
                    <p className="text-hitamGaHitam border-2 border-hitamGaHitam rounded-lg px-2 ml-14 mr-1 cursor-pointer hover:bg-slate-200 transition-all">
                      -
                    </p>
                    <p className="text-hitamGaHitam px-2 mx-1 ">1</p>
                    <p className="text-white border-orange-600 hover:bg-orange-600/90 hover:border-orange-600/90 bg-orange-600 border-2 rounded-lg px-2 mx-1 cursor-pointer transition-all">
                      +
                    </p>  
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* harga total */}
          <div className="mt-4 flex flex-col">
            <hr />
            <div className="flex flex-row justify-between mx-3 my-5">
              <div>
                <h1 className="textbase font-semibold text-hitamGaHitam/50">
                  Subtotal
                </h1>
                <h1 className="text-base font-semibold text-hitamGaHitam/50">
                  Tax
                </h1>
              </div>
              <div>
                <h1 className="font-semibold text-hitamGaHitam">
                  Rp.400,000.00
                </h1>
                <h1 className="font-semibold text-hitamGaHitam">
                  Rp.10,000.00
                </h1>
              </div>
            </div>
            <hr />
            <div className="flex flex-row justify-between mx-3 my-6">
              <h1 className=" text-base font-semibold text-hitamGaHitam">
                Total
              </h1>
              <h1 className="font-semibold text-hitamGaHitam mr-1">
                Rp.310.000,00
              </h1>
            </div>
          </div>
          {/* button */}
          <div className="my-4 flex justify-center">
            <button className="w-10/12 bg-orange-600 hover:bg-orange-600/90 text-white font-medium py-2 mx-2 rounded-lg transition-all">
              Print Bills
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Menu;
