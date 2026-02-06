import Image from "next/image";

export default function footerSection() {
  return (
    <div className="bg-[#111418] w-full h-max px-6 sm:px-12 lg:px-24 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:basis-2/5">
          <div className="flex flex-row items-center">
            <Image src="/logo/Logo.png" alt="logo" width={52} height={52} />
            <h1 className="uppercase text-white font-bold text-2xl ml-4">
              fooder
            </h1>
          </div>

          <p className="text-[#f5f5f5] tracking-wide capitalize my-6 text-sm leading-6">
            our job is to filling your tummy <br />
            with delicious food and with fast <br />
            and free delivery.
          </p>

          <div className="flex flex-row gap-6">
            <Image src="/home/instagram.png" alt="" width={22} height={22} />
            <Image src="/home/twitter.png" alt="" width={22} height={22} />
            <Image src="/home/email.jpg" alt="" width={22} height={22} />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
          <div>
            <h1 className="text-white font-bold text-xl pt-2">About</h1>
            <div className="pt-6 text-[#f5f5f5] capitalize">
              <p className="footer-link">about us</p>
              <p className="footer-link">features</p>
              <p className="footer-link">news</p>
              <p className="footer-link">menu</p>
            </div>
          </div>

          <div>
            <h1 className="text-white font-bold text-xl pt-2">Company</h1>
            <div className="pt-6 text-[#f5f5f5] capitalize">
              <p className="footer-link">why fooder?</p>
              <p className="footer-link">partner with us</p>
              <p className="footer-link uppercase">FAQ</p>
              <p className="footer-link">blog</p>
            </div>
          </div>

          <div>
            <h1 className="text-white font-bold text-xl pt-2">Support</h1>
            <div className="pt-6 text-[#f5f5f5] capitalize">
              <p className="footer-link">account</p>
              <p className="footer-link">support center</p>
              <p className="footer-link">feedback</p>
              <p className="footer-link">contact us</p>
              <p className="footer-link">accessibility</p>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h1 className="text-white font-bold text-xl pt-2">Get In Touch</h1>
            <div className="pt-6">
              <p className="text-[#f5f5f5] text-sm leading-6">
                Question or feedback? <br />
                we&apos;d love to hear from you
              </p>

              <form className="mt-4 flex items-center border-2 border-white/20 rounded-full px-4 py-2 bg-transparent">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="bg-transparent text-white placeholder:text-white/60 outline-none text-sm flex-1"
                />
                <button
                  type="submit"
                  className="ml-3 bg-orange-500 hover:bg-orange-600 transition rounded-full p-2 flex items-center justify-center"
                >
                  <Image
                    src="/home/send.png"
                    alt="send"
                    width={18}
                    height={18}
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
