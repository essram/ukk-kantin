"use client";

import { iCategory, IMenu } from "@/app/types";
import { BASE_API_URL } from "@/global";
import { post } from "@/lib/api-bridge";
import { getCookie } from "@/lib/client-cookies";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  ButtonPrimary,
  ButtonSuccess,
  ButtonDanger,
} from "@/components/buttonComponents";
import { InputGroupComponent } from "@/components/InputComponent";
import Modal from "@/components/modal";
import Select from "@/components/select";
import FileInput from "@/components/fileInput";
import { getCookies } from "@/lib/server-cookies";
import { get } from "@/lib/api-bridge";

const AddMenu = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState<iCategory[]>([]);

  const [menu, setMenu] = useState<IMenu>({
    id: 0,
    uuid: ``,
    name: ``,
    price: 0,
    description: ``,
    id_category: 0,
    picture: ``,
    createdAt: ``,
    updatedAt: ``,
  });

  const GetDataCategory = async (): Promise<iCategory[]> => {
    try {
      const TOKEN = (await getCookies("token")) ?? "";
      const url = `${BASE_API_URL}/category/items`;
      const { data } = await get(url, TOKEN);
      let result: iCategory[] = [];
      if (data?.status) result = [...data.data];
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  useEffect(() => {
    const fetchData = async () => {;
      const resultDataCategory = await GetDataCategory();
      setCategoryData(resultDataCategory);
    };
    fetchData();
  }, []);

  const router = useRouter();

  const TOKEN = getCookie("token") || "";

  const [file, setFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const openModal = () => {
    setMenu({
      id: 0,
      uuid: ``,
      name: ``,
      price: 0,
      description: ``,
      id_category: 0,
      picture: ``,
      createdAt: ``,
      updatedAt: ``,
    });
    setIsShow(true);
    if (formRef.current) formRef.current.reset();
  };
  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const url = `${BASE_API_URL}/menu`;
      const { name, price, description, id_category } = menu;
      const payload = new FormData();
      payload.append("name", name || "");
      payload.append("price", price !== undefined ? price.toString() : "0");
      payload.append("category", id_category.toString() || '');
      payload.append("description", description || "");
      payload.append("stan_id", getCookie("stan_id") || "");
      if (file !== null) payload.append("picture", file || "");
      const { data } = await post(url, payload, TOKEN);
      if (data?.status) {
        setIsShow(false);
        toast(data?.message, {
          hideProgressBar: true,
          containerId: `toastMenu`,
          type: `success`,
        });
        setTimeout(() => window.location.reload(), 500);
      } else {
        toast(data?.message, {
          hideProgressBar: true,
          containerId: `toastMenu`,
          type: `warning`,
        });
      }
    } catch (error) {
      console.log(error);
      toast(`Something Wrong`, {
        hideProgressBar: true,
        containerId: `toastMenu`,
        type: `error`,
      });
    }
  };
  return (
    <div>
      <ToastContainer containerId={`toastMenu`} />
      <ButtonSuccess type="button" onClick={() => openModal()}>
        <div className="flex items-center gap-2">
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add Menu
        </div>
      </ButtonSuccess>
      <Modal isShow={isShow} onClose={(state) => setIsShow(state)}>
        <form onSubmit={handleSubmit}>
          {/* modal header */}
          <div className="sticky top-0 bg-white px-5 pt-5 pb-3 shadow">
            <div className="w-full flex items-center">
              <div className="flex flex-col">
                <strong className="font-bold text-2xl">Create New Menu</strong>
                <small className="text-slate-400 text-sm">
                  Managers can create menu items on this page.
                </small>
              </div>
              <div className="ml-auto">
                <button
                  type="button"
                  className="text-slate-400"
                  onClick={() => setIsShow(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* end modal header */}

          {/* modal body */}
          <div className="p-5">
            <InputGroupComponent
              id={`name`}
              type="text"
              value={menu.name}
              onChange={(val) => setMenu({ ...menu, name: val })}
              required={true}
              label="Name"
            />

            <InputGroupComponent
              id={`price`}
              type="number"
              value={menu.price.toString()}
              onChange={(val) => setMenu({ ...menu, price: Number(val) })}
              required={true}
              label="Price"
            />

            <InputGroupComponent
              id={`description`}
              type="text"
              value={menu.description}
              onChange={(val) => setMenu({ ...menu, description: val })}
              required={true}
              label="Description"
            />

            <Select
              id={`category`}
              value={menu.id_category.toString()}
              label="Category"
              required={true}
              onChange={(val) => setMenu({ ...menu, id_category: parseInt(val) })}
            >
              <option value="">--- Select Category ---</option>
              {/* <option value="FOOD">Food</option>
              <option value="SNACK">Snack</option>
              <option value="DRINK">Drink</option> */}
              {categoryData.map((category) => (
              <option value={category.id} key={category.id}>{category.name}</option>
                
              ))}
            </Select>

            <FileInput
              acceptTypes={[
                "application/pdf",
                "image/png",
                "image/jpeg",
                "image/jpg",
              ]}
              id="profile_picture"
              label="Upload Picture (Max 2MB, PDF/JPG/JPEG/PNG)"
              onChange={(f) => setFile(f)}
              required={false}
            />
          </div>
          {/* end modal body */}

          {/* modal footer */}
          <div className="w-full p-5 flex rounded-b-2xl shadow">
            <div className="flex ml-auto gap-2">
              <ButtonDanger type="button" onClick={() => setIsShow(false)}>
                Cancel
              </ButtonDanger>
              <ButtonPrimary type="submit">Save</ButtonPrimary>
            </div>
          </div>
          {/* end modal footer */}
        </form>
      </Modal>
    </div>
  );
};

export default AddMenu;
