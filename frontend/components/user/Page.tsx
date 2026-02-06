import Image from "next/image";
import Profil from "../../public/2.png";
const User = () => {
  return (
    <div className="bg-putihGaPutih">
      <div className="flex flex-col">
        <h1 className="text-hitamGaHitam text-2xl font-semibold font-poppins ">
          Account Settings
        </h1>
        {/* div parent */}
        <div className="text-white my-4 w-full flex flex-row bg-white h-screen rounded-xl">
          {/* div kanan */}
          <div className="text-white my-2 basis-80 border-r-2 font-poppins">
            <ul className="">
              <li className="bg-oren/15 hover:bg-oren hover:text-white hover:transition-all text-orange-500 py-1 px-4 my-1 rounded-full cursor-pointer inline-block mx-2">
                My Profile
              </li>
              <li className=" text-orange-500 py-1 px-4 my-1  mx-2 cursor-pointer hover:text-orange-700 hover:transition-all">
                Settings
              </li>
              <li className=" text-orange-500 py-1 px-4 my-1  mx-2 cursor-pointer hover:text-orange-700 hover:transition-all">
                Notification
              </li>
            </ul>
          </div>
          {/* div kanan */}
          <div className="text-hitamGaHitam basis-5/6 my-4 mx-6">
            <h1 className="text-2xl font-semibold font-poppins  text-hitamGaHitam">
              My Profile
            </h1>
            {/* div 1 */}
            <div className="border-2 border-slate-200 rounded-xl my-6 mx-1 p-4 font-poppins">
              {/* Container utama */}
              <div className="flex flex-row items-center justify-between">
                {/* Info Profil */}
                <div className="flex flex-row items-center gap-4">
                  {/* Gambar Profil */}
                  <Image
                    className="w-32 x rounded-full"
                    src={Profil}
                    alt="Profil Picture"
                    width={0}
                    height={0}
                  />

                  {/* Informasi Nama */}
                  <div>
                    <h1 className="text-lg font-semibold">Rama Esa Vahiba</h1>
                    <h3 className="text-sm text-gray-500">Student</h3>
                    <h2 className="text-sm text-gray-500">Malang, East Java</h2>
                  </div>
                </div>

                {/* Icon Edit */}
                <div className="flex flex-row justify-center items-center h-8 px-4 py-2 rounded-full  border-2 border-gray-300 gap-2 cursor-pointer hover:bg-gray-200 hover:transition-all">
                  <h1 className="text-sm text-gray-700">Edit</h1>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#848B95"
                  >
                    <path d="M80 0v-160h800V0H80Zm160-320h56l312-311-29-29-28-28-311 312v56Zm-80 80v-170l448-447q11-11 25.5-17t30.5-6q16 0 31 6t27 18l55 56q12 11 17.5 26t5.5 31q0 15-5.5 29.5T777-687L330-240H160Zm560-504-56-56 56 56ZM608-631l-29-29-28-28 57 57Z" />
                  </svg>
                </div>
              </div>
            </div>
            {/* end div 1 */}

            {/* div 2 */}
            <div className="border-2 border-slate-200 rounded-xl my-6 mx-1 p-4 font-poppins">
              {/* parentnya */}
              <h1 className="text-lg font-semibold mb-4">
                Personal Information
              </h1>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col">
                  <div className="flex flex-row w-full gap-36">
                    <div className="flex flex-col">
                      <h1 className="text-xs text-gray-500">First Name</h1>
                      <h1 className="">Rama </h1>
                    </div>
                    <div>
                      <h1 className="text-xs text-gray-500">Last Name</h1>
                      <h1 className="">Esa</h1>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between w-full mt-6 gap-8">
                    <div className="flex flex-col">
                      <h1 className="text-xs text-gray-500">Email Address</h1>
                      <h1 className="">ramaesa@gmail.com </h1>
                    </div>
                    <div>
                      <h1 className="text-xs text-gray-500">Phone</h1>
                      <h1 className="">+62 123 456 789 10</h1>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-center items-center h-8 px-4 py-2 rounded-full mb-8  border-2 border-gray-300 gap-2 cursor-pointer hover:bg-gray-200 hover:transition-all">
                  <h1 className="text-xs text-gray-700">Edit</h1>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#848B95"
                  >
                    <path d="M80 0v-160h800V0H80Zm160-320h56l312-311-29-29-28-28-311 312v56Zm-80 80v-170l448-447q11-11 25.5-17t30.5-6q16 0 31 6t27 18l55 56q12 11 17.5 26t5.5 31q0 15-5.5 29.5T777-687L330-240H160Zm560-504-56-56 56 56ZM608-631l-29-29-28-28 57 57Z" />
                  </svg>
                </div>
              </div>
            </div>
            {/* end div 2 */}

            {/* div 3 */}
            <div className="border-2 border-slate-200 rounded-xl my-6 mx-1 p-4 font-poppins">
              {/* parentnya */}
              <h1 className="text-lg font-semibold mb-4">Address</h1>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col">
                  <div className="flex flex-row w-full gap-36">
                    <div className="flex flex-col">
                      <h1 className="text-xs text-gray-500">Country</h1>
                      <h1 className="">Indonesia </h1>
                    </div>
                    <div>
                      <h1 className="text-xs text-gray-500">City/State</h1>
                      <h1 className="">Malang</h1>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between w-full mt-6 gap-10">
                    <div className="flex flex-col">
                      <h1 className="text-xs text-gray-500">Postal Code</h1>
                      <h1 className="">12345</h1>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-center items-center h-8 px-4 py-2 rounded-full mb-8  border-2 border-gray-300 gap-2 cursor-pointer hover:bg-gray-200 hover:transition-all">
                  <h1 className="text-sm text-gray-700">Edit</h1>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#848B95"
                  >
                    <path d="M80 0v-160h800V0H80Zm160-320h56l312-311-29-29-28-28-311 312v56Zm-80 80v-170l448-447q11-11 25.5-17t30.5-6q16 0 31 6t27 18l55 56q12 11 17.5 26t5.5 31q0 15-5.5 29.5T777-687L330-240H160Zm560-504-56-56 56 56ZM608-631l-29-29-28-28 57 57Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default User;
