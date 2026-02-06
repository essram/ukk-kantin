import { ReactNode, useState } from "react";
import MenuItem from "./menuItem";
import Image from "next/image";
import Logo from "../../public/restaurant.png";
import Profile from "../../public/2.png";
import { getCookie, removeCookie } from "@/lib/client-cookies";
import { useRouter } from "next/navigation";
import { BASE_API_URL, BASE_IMAGE_PROFILE } from "@/global";
import { IUser } from "@/app/types";
import { get } from "@/lib/api-bridge";
import { getCookies } from "@/lib/server-cookies";

type MenuType = {
  id: string;
  icon: ReactNode;
  path: string;
  label: string;
};

type ManagerProp = {
  children: ReactNode;
  id: string;
  title: string;
  menuList: MenuType[];
};



const Sidebar = ({ children, id, title, menuList }: ManagerProp) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const router = useRouter();

  const handleLogout = () => {
    removeCookie("token");
    removeCookie("id");
    removeCookie("name");
    removeCookie("role");
    removeCookie("image")
    router.push(`/login`);
  };
  
  

  return (
    <div className="w-full min-h-dvh bg-putihGaPutih font-poppins">
      {/* header section */}
      <header className="flex justify-between items-center p-4 mb-0 bg-primary bg-white">
        <div className="flex gap-2">
          <button onMouseEnter={() => setIsShow(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-slate-900 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </button>
          <h1 className="font-bold text-xl text-hitamGaHitam font-poppins">
            {title}
          </h1>
        </div>

        <div className="relative">
          <div
            onClick={toggleDropdown}
            className="flex items-center space-x-2 text-slate-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
            <button className="font-bold" onClick={handleLogout}>
              Logout
            </button>
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 top-full">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </header>
      {/* end header section */}
      {/* content section */}
      {/* end content section */}
      {/* content section */}

      <div className="p-4">{children}</div>
      {/* end content section */}
      <div
        className={`flex flex-col w-2/3 md:w-1/2 lg:w-1/4 h-full fixed top-0 right-full transition-transform z-50
           bg-putihGaPutih border-r border-primary text-slate-900 ${
             isShow ? `translate-x-full` : ``
           }`}
      >
        {/* close button */}
        <div className="ml-auto p-2">
          <button onClick={() => setIsShow(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
        {/* end close button */}

        {/* logo section */}
        <div className="mb-3 w-full flex justify-center">
          <div className="flex items-center space-x-2">
            <Image src={Logo} alt="Logo" width={40} height={40} />
            <h1 className="text-2xl font-bold text-slate-900">Fooder</h1>
          </div>
        </div>
        {/* end logo section */}

        {/* user section */}
        <div className="w-full justify-center mt-10 mb-6 bg-primary text-slate-900 p-3 flex gap-2 items-center">
          <Image
            src={`${BASE_IMAGE_PROFILE}/${getCookie("image")}`}
            alt="Profil"
            width={40}
            height={40}
          />
          <div className="text-xl font-semibold capitalize">
            {getCookie("name")}
          </div>
        </div>
        {/* end user section */}

        {/* menu section */}
        <div className="w-full p-2 overflow-y-auto">
          <div className="px-5">
            {menuList.map((menu, index) => (
              <MenuItem
                icon={menu.icon}
                label={menu.label}
                path={menu.path}
                active={menu.id === id}
                key={`keyMenu${index}`}
              />
            ))}
          </div>
        </div>
        {/* menu section */}
      </div>
      {/* end sidebar section */}
    </div>
  );
};

export default Sidebar;
