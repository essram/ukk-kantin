import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="bg-heroSection w-full min-h-screen text-white">
      <div className="flex flex-col-reverse md:flex-row pt-8 pb-4 justify-center h-full">
        <div
          className="w-full md:w-1/2 flex flex-col gap-7 
                        px-6 md:pl-20 lg:pl-32 
                        py-16 md:py-32"
        >
          <div className="flex flex-row gap-2 items-center justify-center md:justify-start">
            <Image src="/logo/Logo.png" alt="Logo" width={60} height={60} />
            <p className="font-medium text-base">NomNom</p>
          </div>
          <h1
            className="text-4xl sm:text-5xl/tight md:text-7xl/tight lg:text-8xl/tight
                         font-bold font-oswald tracking-tight leading-tight text-center md:text-left"
          >
            The Happiest Place For Hungry People
          </h1>

          <div className="text-center md:text-left">
            <p className="text-sm sm:text-base max-w-xl mx-auto md:mx-0">
              Discover a wide selection of delicious meals, fast service, and
              friendly vibes. From light snacks to hearty dishes, everything is
              crafted to make every hungry moment easier, happier, and
              satisfying.
            </p>

            <div className="my-6 flex justify-center md:justify-start">
              <button className="bg-oren px-6 py-3 rounded-xl text-base hover:bg-oren/80 transition-all">
                Order Now
              </button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center px-6 md:px-16 pt-10 md:pt-0">
          <div className="relative w-full max-w-[320px] sm:max-w-[420px] md:max-w-[600px] aspect-square">
            <Image
              src="/home/nasgor_heroSection.png"
              alt="nasgor"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
