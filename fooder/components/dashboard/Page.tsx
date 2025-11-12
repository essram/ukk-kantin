"use client";

import homeImages from "@/lib/homeImages";
import menuImages from "@/lib/menuImages";
import Image from "next/image";

const DashboardPage = () => {
  return ( 
    <div className="font-poppins">
      <div className="flex flex-row justify-center h-max">
        <div className="basis-1/2 mx-2 flex justify-center h-max mt-48">
          <div className="flex flex-col">
            <h1 className="text-6xl/tight text-hitamGaHitam font-bold">
              Be The Fastest In Delivering Your{" "}
              <span className="text-orange-500">Food</span>
            </h1>
            <p className="text-hitamGaHitam text-base/7 my-2 w-4/5 text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat
            </p>
            <div className="flex flex-row mt-2 h-max">
              <button className="bg-orange-500 text-white px-5 py-3 rounded-full text-center font-semibold text-base">
                Order Now
              </button>
              <button className=" text-white px-5 py-3 rounded-full text-center ml-2 flex flex-row bg-white drop-shadow-sm text-base  ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#F09E39"
                >
                  <path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>
                <p className="pl-2 text-hitamGaHitam font-semibold">
                  Watch Video
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className="basis-1/2x mx-2 ">
          <div className="flex justify-center mt-6">
            <Image
              src={homeImages.Foto1}
              width={480}
              height={300}
              alt=""
              className="rounded-full"
            />
          </div>
          {/* <div className="bg-black ">
            <h1>3,500 + Ratings</h1>
          </div> */}
        </div>
      </div>
      {/* services */}
      <div className="h-max">
        <div className="flex mt-36 mb-24 flex-col text-center">
          <h1 className="font-semibold text-md uppercase text-orange-500 ">
            what we serve
          </h1>
          <h1 className="text-hitamGaHitam text-4xl font-bold my-4">
            Your Favorite Food Delivery Partner
          </h1>
        </div>
        <div className="flex flex-row justify-evenly m-0">
          <div className="flex flex-col items-center">
            <div className=" bg-orange-500/15 p-3  flex items-center justify-center rounded-lg w-max">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="88px"
                viewBox="0 -960 960 960"
                width="88px"
                fill="#F97316"
              >
                <path d="M160-160v-516L82-846l72-34 94 202h464l94-202 72 34-78 170v516H160Zm240-280h160q17 0 28.5-11.5T600-480q0-17-11.5-28.5T560-520H400q-17 0-28.5 11.5T360-480q0 17 11.5 28.5T400-440ZM240-240h480v-358H240v358Zm0 0v-358 358Z" />
              </svg>
            </div>
            <h1 className="capitalize text-center text-hitamGaHitam font-semibold text-xl my-6">
              easy to order
            </h1>
          </div>
          <div className="flex flex-col items-center">
            <div className=" bg-orange-500/15 p-3  flex items-center justify-center rounded-lg w-max">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="88px"
                viewBox="0 -960 960 960"
                width="88px"
                fill="#F97316"
              >
                <path d="M280-160q-50 0-85-35t-35-85H60l18-80h113q17-19 40-29.5t49-10.5q26 0 49 10.5t40 29.5h167l84-360H182l4-17q6-28 27.5-45.5T264-800h456l-37 160h117l120 160-40 200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H400q0 50-35 85t-85 35Zm357-280h193l4-21-74-99h-95l-28 120Zm-19-273 2-7-84 360 2-7 34-146 46-200ZM20-427l20-80h220l-20 80H20Zm80-146 20-80h260l-20 80H100Zm180 333q17 0 28.5-11.5T320-280q0-17-11.5-28.5T280-320q-17 0-28.5 11.5T240-280q0 17 11.5 28.5T280-240Zm400 0q17 0 28.5-11.5T720-280q0-17-11.5-28.5T680-320q-17 0-28.5 11.5T640-280q0 17 11.5 28.5T680-240Z" />
              </svg>
            </div>
            <h1 className="capitalize text-center text-hitamGaHitam font-semibold text-xl my-6">
              fastest delivery
            </h1>
          </div>
          <div className="flex flex-col items-center">
            <div className=" bg-orange-500/15 p-3  flex items-center justify-center rounded-lg w-max">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="88px"
                viewBox="0 -960 960 960"
                width="88px"
                fill="#F97316"
              >
                <path d="m389-400 91-55 91 55-24-104 80-69-105-9-42-98-42 98-105 9 80 69-24 104ZM200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" />
              </svg>
            </div>
            <h1 className="capitalize text-center text-hitamGaHitam font-semibold text-xl my-6">
              best quality
            </h1>
          </div>
        </div>
      </div>
      {/* services end */}
      {/* our menu start */}
      <div className="flex flex-col h-max">
        <div className="mt-36 mb-14 mx-28">
          <h1 className="font-semibold text-md uppercase text-orange-500 mb-3">
            our menu
          </h1>
          <h1 className="capitalize text-hitamGaHitam font-bold text-4xl ">
            menu that always <br /> make you fall in love
          </h1>
        </div>
        <div className="flex flex-row justify-between mx-28 overflow-hidden space-x-8">
          <div className="relative w-72 h-96 rounded-xl overflow-hidden shadow-lg  animate-moveLeftLoop hover:animate-none">
            {/* gambar */}
            <Image src={menuImages.Menu8} alt="" />

            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

            {/* konten */}
            <div className="absolute bottom-4 left-4 text-white">
              <h1 className="text-lg font-bold">Italian Pizza</h1>
              <p className="text-xl font-semibold">$ 7.49</p>
              <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm flex items-center gap-2">
                Order Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16px"
                  viewBox="0 0 24 24"
                  width="16px"
                  fill="#fff"
                >
                  <path d="M10 17l5-5-5-5v10z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="relative w-72 h-96 rounded-xl overflow-hidden shadow-lg mr-8 animate-moveLeftLoop hover:animate-none">
            {/* gambar */}
            <Image src={menuImages.Menu9} alt="" />

            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

            {/* konten */}
            <div className="absolute bottom-4 left-4 text-white">
              <h1 className="text-lg font-bold">Milk Shake</h1>
              <p className="text-xl font-semibold">$ 5.28</p>
              <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm flex items-center gap-2">
                Order Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16px"
                  viewBox="0 0 24 24"
                  width="16px"
                  fill="#fff"
                >
                  <path d="M10 17l5-5-5-5v10z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="relative w-72 h-96 rounded-xl overflow-hidden shadow-lg mr-8 animate-moveLeftLoop hover:animate-none">
            {/* gambar */}
            <Image src={menuImages.Menu10} alt="" />

            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

            {/* konten */}
            <div className="absolute bottom-4 left-4 text-white">
              <h1 className="text-lg font-bold">Dessert</h1>
              <p className="text-xl font-semibold">$ 6.15</p>
              <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm flex items-center gap-2">
                Order Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16px"
                  viewBox="0 0 24 24"
                  width="16px"
                  fill="#fff"
                >
                  <path d="M10 17l5-5-5-5v10z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="relative w-72 h-96 rounded-xl overflow-hidden shadow-lg mr-8 animate-moveLeftLoop hover:animate-none">
            {/* gambar */}
            <Image src={menuImages.Menu11} alt="" />

            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

            {/* konten */}
            <div className="absolute bottom-4 left-4 text-white">
              <h1 className="text-lg font-bold">Burger</h1>
              <p className="text-xl font-semibold">$ 10.00</p>
              <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm flex items-center gap-2">
                Order Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16px"
                  viewBox="0 0 24 24"
                  width="16px"
                  fill="#fff"
                >
                  <path d="M10 17l5-5-5-5v10z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* our menu end */}
      {/* rate start */}
      <div className="flex flex-row h-max my-36">
        <div className="basis-1/2 mx-28 relative">
          <div>
            <Image
              src={homeImages.Rate1}
              width={550}
              height={550}
              alt="chef"
              className="w-full rounded-2xl"
            />
          </div>

          {/* reviewer card */}
          <div className="absolute bottom-4 right-4 h-max bg-white p-4 rounded-xl shadow-lg flex flex-col  gap-2 z-20">
            <h1 className="capitalize text-xl font-semibold  text-hitamGaHitam">
              our reviewer
            </h1>
            <div className="flex h-max w-max items-center mx-2 my-2">
              <Image
                src={homeImages.Person1}
                width={50}
                height={50}
                alt="Reviewer 1"
                className=" rounded-full"
              />
              <Image
                src={homeImages.Person2}
                width={50}
                height={50}
                alt="Reviewer 2"
                className=" rounded-full -ml-2"
              />
              <Image
                src={homeImages.Person3}
                width={50}
                height={50}
                alt="Reviewer 3"
                className=" rounded-full -ml-2"
              />
              <div className="bg-orange-500 rounded-full font-bold text-md p-3 text-white -ml-2">
                12k+
              </div>
            </div>
          </div>
        </div>

        <div className="basis 1/2 mx-28 ">
          <div className="flex flex-col my-9 ">
            <h1 className="font-semibold text-md uppercase text-orange-500">
              what they say
            </h1>
            <h1 className="capitalize text-hitamGaHitam font-bold text-4xl my-4">
              what our customer <br /> say about us
            </h1>
            <p className="text-itemCoklat text-justify w-96 text-sm/6 tracking-wide">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat."
            </p>
            <div className="w-52">
              <div className="flex flex-row mt-4">
                <Image
                  src={homeImages.Rate2}
                  alt="orang"
                  width={65}
                  height={65}
                  className="rounded-full shadow-sm h-max"
                />
                <div className="flex flex-col my-2 mx-3">
                  <h2 className="text-hitamGaHitam font-semibold tracking-wide">
                    Bruno Minor
                  </h2>
                  <p className="text-itemCoklat text-sm tracking-wide pt-1">
                    Food Vlogger
                  </p>
                </div>
              </div>
              <div className="flex flex-row mt-2 justify-between items-center w-40 ">
                <Image
                  src={homeImages.Star1}
                  alt="orang"
                  width={15}
                  height={15}
                  className="h-max"
                />
                <Image
                  src={homeImages.Star1}
                  alt="orang"
                  width={15}
                  height={15}
                  className="h-max"
                />
                <Image
                  src={homeImages.Star1}
                  alt="orang"
                  width={15}
                  height={15}
                  className="h-max"
                />
                <Image
                  src={homeImages.Star1}
                  alt="orang"
                  width={15}
                  height={15}
                  className="h-max"
                />
                <Image
                  src={homeImages.Star1}
                  alt="orang"
                  width={15}
                  height={15}
                  className="h-max"
                />
                <p className="text-hitamGaHitam  font-semibold pt-1 text-sm/6">
                  5,0
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* rate end */}
      {/* footer start */}
      <div className="flex flex-row h-max ml-28 mr-24 w-[87%]">
        <div className="  basis-2/3">
          {/* logo */}
          <div className="flex flex-row items-center">
            <Image src={homeImages.Logo} alt="logo" width={52} height={52} />
            <h1 className="uppercase text-hitamGaHitam font-bold text-2xl ml-4">
              fooder
            </h1>
          </div>
          {/* logo end */}
          <p className="text-itemCoklat tracking-wide capitalize my-6 text-sm/6">
            our job is to filling your tummy <br /> with delicious food and with
            fast <br /> and free delivery.
          </p>
          {/* medsos */}
          <div className="flex flex-row  justify-between w-28">
            <Image src={homeImages.Instagram} alt="" width={22} height={22} />
            <Image src={homeImages.Twitter} alt="" width={22} height={22} />
            <Image src={homeImages.Email} alt="" width={22} height={22} />
          </div>
        </div>
        {/* 2 */}
        <div className="  basis-1/3">
          <div className="flex flex-col">
            <h1 className="text-hitamGaHitam font-bold text-xl pt-2">About</h1>
            <div className="pt-8 pb-1">
              <h1 className="text-itemCoklat capitalize text-base/6  pb-2 ">
                about us
              </h1>
              <h1 className="text-itemCoklat capitalize text-base/6  py-2">
                features
              </h1>
              <h1 className="text-itemCoklat capitalize text-base/6  py-2  ">
                news
              </h1>
              <h1 className="text-itemCoklat capitalize text-base/6  py-2  ">
                menu
              </h1>
            </div>
          </div>
        </div>
        {/* 3 */}
        <div className="  basis-1/3">
          <div className="flex flex-col">
            <h1 className="text-hitamGaHitam font-bold text-xl pt-2">
              Company
            </h1>
            <div className="pt-8 pb-1">
              <h1 className="text-itemCoklat capitalize text-base/6  pb-2 ">
                why fooder?
              </h1>
              <h1 className="text-itemCoklat capitalize text-base/6  py-2">
                partner with us
              </h1>
              <h1 className="text-itemCoklat uppercase text-base/6  py-2  ">
                FAQ
              </h1>
              <h1 className="text-itemCoklat capitalize text-base/6  py-2  ">
                blog
              </h1>
            </div>
          </div>
        </div>
        {/* 4 */}
        <div className="  basis-1/3">
          <div className="flex flex-col">
            <h1 className="text-hitamGaHitam font-bold text-xl pt-2">
              Support
            </h1>
            <div className="pt-8 pb-1">
              <h1 className="text-itemCoklat capitalize text-base/6  pb-2 ">
                account
              </h1>
              <h1 className="text-itemCoklat capitalize text-base/6  py-2">
                support center
              </h1>
              <h1 className="text-itemCoklat capitalize text-base/6  py-2  ">
                feedback
              </h1>
              <h1 className="text-itemCoklat capitalize text-base/6  py-2  ">
                contact us
              </h1>
              <h1 className="text-itemCoklat capitalize text-base/6  py-2  ">
                accesbility
              </h1>
            </div>
          </div>
        </div>
        {/* 5 */}
        <div className="  basis-1/3">
          <div className="flex flex-col">
            <h1 className="text-hitamGaHitam font-bold text-xl pt-2">
              Get In Touch
            </h1>
            <div className="pt-8 pb-1">
              <h1 className="text-itemCoklat  text-base/7  pb-2 ">
                Question or feedback? <br />
                we'd love to hear from you
              </h1>
              <div className="mt-4">
                <form className="flex flex-row items-center border-2 text-sm w-52 justify-between text-hitamGaHitam rounded-full px-6 py-4">
                  Email Address
                  <Image
                    src={homeImages.Send}
                    alt="send"
                    width={18}
                    height={18}
                    className="mr-0"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
