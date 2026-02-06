import Image from "next/image";

export default function ReviewSection() {
  return (
    <div className="bg-ourMenuBlakcSection w-full h-max py-10 sm:py-12 lg:py-14 px-6 sm:px-12 lg:px-32">
      <div className="flex flex-col items-start justify-center gap-3 sm:gap-4">
        <h1 className="text-orange font-bold font-oswald text-3xl sm:text-4xl">
          Our Menu
        </h1>
        <h2 className="text-white font-bold font-oswald text-3xl sm:text-4xl lg:text-5xl w-full sm:w-[70%] lg:w-[30%] leading-tight">
          Menu That Always Make You Fall In Love
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-8 sm:my-10 lg:my-12 gap-6 sm:gap-8 lg:gap-12 place-items-center">
        <div className="relative w-full max-w-[280px] sm:max-w-[300px] h-80 sm:h-96 rounded-xl overflow-hidden shadow-lg animate-moveLeftLoop hover:animate-none">
          <Image
            src="/home/foodCategory.jpg"
            alt=""
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

          <div className="absolute bottom-4 left-4 text-white">
            <h1 className="text-base sm:text-lg font-bold">Milk Shake</h1>
            <p className="text-lg sm:text-xl font-semibold">Rp.5,000</p>
            <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-xs sm:text-sm flex items-center gap-2">
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

        <div className="relative w-full max-w-[280px] sm:max-w-[300px] h-80 sm:h-96 rounded-xl overflow-hidden shadow-lg animate-moveLeftLoop hover:animate-none">
          <Image
            src="/home/foodCategory.jpg"
            alt=""
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h1 className="text-base sm:text-lg font-bold">Dessert</h1>
            <p className="text-lg sm:text-xl font-semibold">Rp.6,000</p>
            <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-xs sm:text-sm flex items-center gap-2">
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

        <div className="relative w-full max-w-[280px] sm:max-w-[300px] h-80 sm:h-96 rounded-xl overflow-hidden shadow-lg animate-moveLeftLoop hover:animate-none">
          <Image
            src="/home/foodCategory.jpg"
            alt=""
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h1 className="text-base sm:text-lg font-bold">Burger</h1>
            <p className="text-lg sm:text-xl font-semibold">Rp.10,000</p>
            <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-xs sm:text-sm flex items-center gap-2">
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

        <div className="relative w-full max-w-[280px] sm:max-w-[300px] h-80 sm:h-96 rounded-xl overflow-hidden shadow-lg animate-moveLeftLoop hover:animate-none">
          <Image
            src="/home/foodCategory.jpg"
            alt=""
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h1 className="text-base sm:text-lg font-bold">Burger</h1>
            <p className="text-lg sm:text-xl font-semibold">Rp.10,000</p>
            <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-xs sm:text-sm flex items-center gap-2">
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
  );
}
