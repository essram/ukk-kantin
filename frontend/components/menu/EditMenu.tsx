"use client";

import { iCategory, IMenu } from "@/app/types";
import { BASE_API_URL } from "@/global";
import { get, put } from "@/lib/api-bridge";
import { getCookie } from "@/lib/client-cookies";
import { useEffect, useRef, useState, FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  ButtonPrimary,
  ButtonDanger,
  ButtonInfo,
} from "@/components/buttonComponents";
import { InputGroupComponent } from "@/components/InputComponent";
import Modal from "@/components/modal";
import Select from "@/components/select";
import FileInput from "@/components/fileInput";

const EditMenu = ({ selectedMenu }: { selectedMenu: IMenu }) => {
  const [isShow, setIsShow] = useState(false);

  const [menu, setMenu] = useState({
    id: selectedMenu.id,
    name: selectedMenu.name,
    price: selectedMenu.price,
    description: selectedMenu.description,
    id_category: selectedMenu.category?.id || 0,
  });

  const [categoryData, setCategoryData] = useState<iCategory[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const TOKEN = getCookie("token") || "";

  const openModal = () => {
    setMenu({
      id: selectedMenu.id,
      name: selectedMenu.name,
      price: selectedMenu.price,
      description: selectedMenu.description,
      id_category: selectedMenu.category?.id || 0,
    });

    setFile(null);
    setIsShow(true);

    if (formRef.current) formRef.current.reset();
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const url = `${BASE_API_URL}/menu/${menu.id}`;

      const payload = new FormData();
      payload.append("name", menu.name);
      payload.append("price", menu.price.toString());
      payload.append("description", menu.description);
      payload.append("category", menu.id_category.toString());

      if (file) {
        payload.append("picture", file);
      }

      const { data } = await put(url, payload, TOKEN);

      if (data?.status) {
        setIsShow(false);

        toast(data.message, {
          hideProgressBar: true,
          containerId: "toastMenu",
          type: "success",
        });

        setTimeout(() => window.location.reload(), 500);
      } else {
        toast(data?.message || "Update failed", {
          hideProgressBar: true,
          containerId: "toastMenu",
          type: "warning",
        });
      }
    } catch (error) {
      console.log(error);
      toast("Something went wrong", {
        hideProgressBar: true,
        containerId: "toastMenu",
        type: "error",
      });
    }
  };

  const fetchCategory = async () => {
    try {
      const url = `${BASE_API_URL}/category/items`;
      const { data } = await get(url, TOKEN);

      if (data?.status) {
        setCategoryData(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div>
      <ToastContainer containerId="toastMenu" />

      <ButtonInfo type="button" onClick={openModal}>
        Edit
      </ButtonInfo>

      <Modal isShow={isShow} onClose={(state) => setIsShow(state)}>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="sticky top-0 bg-white px-5 pt-5 pb-3 shadow">
            <strong className="text-2xl">Update Menu</strong>
          </div>

          <div className="p-5 space-y-4">
            <InputGroupComponent
              id="name"
              type="text"
              label="Name"
              value={menu.name}
              required
              onChange={(val) =>
                setMenu({ ...menu, name: val })
              }
            />

            <InputGroupComponent
              id="price"
              type="number"
              label="Price"
              value={menu.price.toString()}
              required
              onChange={(val) =>
                setMenu({ ...menu, price: Number(val) })
              }
            />

            <InputGroupComponent
              id="description"
              type="text"
              label="Description"
              value={menu.description}
              required
              onChange={(val) =>
                setMenu({ ...menu, description: val })
              }
            />

            <Select
              id="category"
              label="Category"
              value={menu.id_category.toString()}
              required
              onChange={(val) =>
                setMenu({ ...menu, id_category: Number(val) })
              }
            >
              <option value="">--- Select Category ---</option>
              {categoryData.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Select>

            <FileInput
              id="picture"
              label="Upload Photo (Optional)"
              acceptTypes={[
                "image/png",
                "image/jpeg",
                "image/jpg",
              ]}
              onChange={(f) => setFile(f)}
              required={false}
            />
          </div>

          <div className="flex justify-end gap-2 p-5">
            <ButtonDanger
              type="button"
              onClick={() => setIsShow(false)}
            >
              Cancel
            </ButtonDanger>
            <ButtonPrimary type="submit">
              Save
            </ButtonPrimary>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EditMenu;
