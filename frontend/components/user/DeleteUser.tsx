"use client";

import { IUser } from "@/app/types";
import { BASE_API_URL } from "@/global";
import { drop } from "@/lib/api-bridge";
import { getCookie } from "@/lib/client-cookies";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ButtonPrimary, ButtonDanger, ButtonInfo } from "@/components/buttonComponents";
import Modal from "@/components/modal";

const DeleteUser = ({ selectedUser }: { selectedUser: IUser }) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const [user, setUser] = useState<IUser>({ ...selectedUser });

  const router = useRouter();

  const TOKEN = getCookie("token") || "";

  const openModal = () => {
    setUser({ ...selectedUser });
    setIsShow(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const url = `${BASE_API_URL}/user/${selectedUser.id}`;
      const { data } = await drop(url, TOKEN);
      if (data?.status) {
        setIsShow(false);
        toast(data?.message, {
          hideProgressBar: true,
          containerId: `toastUser`,
          type: `success`,
        });
        setTimeout(() => window.location.reload(), 500);
      } else {
        toast(data?.message, {
          hideProgressBar: true,
          containerId: `toastUser`,
          type: `warning`,
        });
      }
    } catch (error) {
      console.log(error);
      toast(`Something Wrong`, {
        hideProgressBar: true,
        containerId: `toastUser`,
        type: `error`,
      });
    }
  };
  return (
    <div>
      <ToastContainer containerId={`toastUser`} />
      <ButtonInfo type="button" onClick={() => openModal()}>
        Delete
      </ButtonInfo>
      <Modal isShow={isShow} onClose={state => setIsShow(state)}>
               <form onSubmit={handleSubmit} className="font-poppins">
                   {/* modal header */}
                   <div className="sticky top-0 bg-white px-5 pt-5  ">
                       <div className="w-full flex items-center">
                           <div className="flex flex-col">
                               <strong className="font-bold text-2xl">Delete User</strong>
                               {/* <small className="text-slate-400 text-sm">Menus with existing transaction data cannot be deleted from this page.</small> */}
                           </div>
                           <div className="ml-auto">
                               <button type="button" className="text-slate-400" onClick={() => setIsShow(false)}>
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                       <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                   </svg>
                               </button>
                           </div>
                       </div>
                   </div>
                   {/* end modal header */}

                   {/* modal body */}
                   <div className="px-5 py-2">
                   Are you sure you want to delete this user <span className="font-bold capitalize">{user.name}?</span>
                   </div>
                   {/* end modal body */}

                   {/* modal footer */}
                   <div className="w-full p-5 flex rounded-b-2xl shadow">
                       <div className="flex ml-auto gap-2">
                           <ButtonDanger type="button" onClick={() => setIsShow(false)}>
                               Cancel
                           </ButtonDanger>
                           <ButtonPrimary type="submit">
                               Save
                           </ButtonPrimary>
                       </div>
                   </div>
                   {/* end modal footer */}
               </form>
           </Modal>

    </div>
  );
};
export default DeleteUser;
