import Image from "next/image";

export default function ReviewSection() {
  return (
    <div className="bg-creamCategorySection h-max font-oswald px-6 md:px-12 lg:px-0">
      <div className="flex flex-col lg:flex-row h-max py-16 md:py-24 lg:py-36 gap-12">
        <div className="w-full lg:basis-1/2 lg:mx-28 relative">
          <Image
            src="/home/rate1.jpg"
            width={550}
            height={550}
            alt="chef"
            className="w-full rounded-2xl"
          />

          <div
            className="
            absolute 
            bottom-4 right-4 
            bg-white p-4 rounded-xl shadow-lg 
            flex flex-col gap-2 z-20
            scale-90 md:scale-100
          "
          >
            <h1 className="capitalize text-lg md:text-xl font-semibold text-hitamGaHitam">
              our reviewer
            </h1>

            <div className="flex items-center mx-2 my-2">
              <Image
                src="/home/person1.jpg"
                width={45}
                height={45}
                alt="Reviewer 1"
                className="rounded-full"
              />
              <Image
                src="/home/person2.jpg"
                width={45}
                height={45}
                alt="Reviewer 2"
                className="rounded-full -ml-2"
              />
              <Image
                src="/home/person3.jpg"
                width={45}
                height={45}
                alt="Reviewer 3"
                className="rounded-full -ml-2"
              />
              <div className="bg-orange-500 rounded-full font-bold text-sm md:text-md p-2 md:p-3 text-white -ml-2">
                12k+
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:basis-1/2 lg:mx-28">
          <div className="flex flex-col my-4 md:my-9">
            <h1 className="font-bold text-3xl md:text-4xl text-orange uppercase text-orange-500">
              what they say
            </h1>

            <h1 className="capitalize text-black font-bold text-3xl md:text-5xl my-4 leading-tight">
              what our customer <br className="hidden md:block" /> say about us
            </h1>

            <p
              className="text-black text-justify font-figtree 
                          w-full md:w-96 
                          text-sm md:text-base leading-relaxed tracking-wide"
            >
              <span className="font-bold text-2xl leading-none"> &ldquo; </span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
              <span className="font-bold text-2xl leading-none"> &rdquo; </span>
            </p>

            <div className="w-full md:w-52">
              <div className="flex flex-row mt-6 items-center">
                <div className="w-[55px] h-[55px] md:w-[65px] md:h-[65px] rounded-full overflow-hidden shadow-sm">
                  <Image
                    src="/home/rate2.jpg"
                    alt="orang"
                    width={65}
                    height={65}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="flex flex-col my-2 mx-3 font-figtree">
                  <h2 className="text-hitamGaHitam font-semibold tracking-wide">
                    Bruno Minor
                  </h2>
                  <p className="text-itemCoklat text-sm tracking-wide pt-1">
                    Food Vlogger
                  </p>
                </div>
              </div>

              <div className="flex flex-row mt-3 justify-between items-center w-40">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Image
                    key={i}
                    src="/home/star.png"
                    alt="star"
                    width={15}
                    height={15}
                  />
                ))}
                <p className="text-hitamGaHitam font-figtree font-semibold pt-1 text-sm">
                  5,0
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
