import Image from "next/image";

export default function FoodCategorySection() {
  return (
    <div className="h-max bg-creamCategorySection w-full py-14 px-6 md:px-12">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1
          className="font-oswald font-bold 
                       text-3xl sm:text-4xl md:text-5xl 
                       text-center"
        >
          Discover Our Food Category
        </h1>

        <p
          className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5 
                      text-center text-sm sm:text-base"
        >
          From fresh bites to hearty meals and irresistible treats — everything
          is neatly arranged into categories that help you discover exactly what
          you’re craving without the hassle.
        </p>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                      justify-items-center gap-8 my-10 font-oswald"
      >
        <div className="flex flex-col items-center">
          <Image
            src="/home/foodCategory.jpg"
            alt="Food Category"
            width={250}
            height={250}
            className="rounded-lg pb-4 w-[200px] sm:w-[220px] md:w-[250px] h-auto"
          />
          <h3 className="text-xl sm:text-2xl font-semibold">Food</h3>
          <p className="font-figtree py-1 text-sm">stock</p>
        </div>

        <div className="flex flex-col items-center">
          <Image
            src="/home/drinkCategory.jpg"
            alt="Drink Category"
            width={250}
            height={250}
            className="rounded-lg pb-4 w-[200px] sm:w-[220px] md:w-[250px] h-auto"
          />
          <h3 className="text-xl sm:text-2xl font-semibold">Drink</h3>
          <p className="font-figtree py-1 text-sm">stock</p>
        </div>

        <div className="flex flex-col items-center">
          <Image
            src="/home/snackCategory.jpg"
            alt="Snack Category"
            width={250}
            height={250}
            className="rounded-lg pb-4 w-[200px] sm:w-[220px] md:w-[250px] h-auto"
          />
          <h3 className="text-xl sm:text-2xl font-semibold">Snack</h3>
          <p className="font-figtree py-1 text-sm">stock</p>
        </div>
      </div>
    </div>
  );
}
