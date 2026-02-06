"use client";
import { BASE_API_URL } from "@/global";
import { getCookies } from "@/lib/server-cookies";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { iOrder, IPayMethod, IMenu } from "@/app/types";
import { get, put } from "@/lib/api-bridge";
import { generatorString } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const getOrder = async (id: string): Promise<iOrder | null> => {
  try {
    const TOKEN = (await getCookies("token")) ?? "";
    const url = `${BASE_API_URL}/order/${id}`;
    const { data } = await get(url, TOKEN);

    if (data?.status) return data.data;
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getMethod = async (tipe: string): Promise<IPayMethod[]> => {
  try {
    const TOKEN = (await getCookies("token")) ?? "";
    const url = `${BASE_API_URL}/pay-method/tipe?type=${tipe}`;
    const { data } = await get(url, TOKEN);
    let result: IPayMethod[] = [];
    if (data?.status) result = [...data.data];
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default function PaymentPage() {
  const [email, setEmail] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [virtualAccount, setVirtualAccount] = useState("");
  const [cashAmount, setCashAmount] = useState("");
  const [order, setOrder] = useState<iOrder | null>(null);
  const [onlineMethod, setOnlineMethod] = useState<IPayMethod[]>([]);
  const [DebitMethod, setDebitMethod] = useState<IPayMethod[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [showOnlineMethod, setShowOnlineMethod] = useState(false);
  const [showDebitMethod, setShowDebitMethod] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(0);
  const [showVaNumber, setShowVaNumber] = useState(false);
  const [defaultVaNumber, setdefaultVaNumber] = useState(generatorString(16));
  const [showInputCard, setShowInputcard] = useState(false);

  const router = useRouter();

  const paymentMethods = [
    { id: "cash", label: "Cash" },
    { id: "online", label: "Online" },
  ];

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      if (typeof id === "string") {
        const result = await getOrder(id);
        if (result) setOrder(result);
      }
    };
    fetchData();
  }, [id]);

  const payOrder = async () => {
    console.log("selectedMethod");

    try {
      const TOKEN = (await getCookies("token")) ?? "";

      const url = `${BASE_API_URL}/pay-order/updateByOrderId/${id}`;
      const payload: any = {
        status: "BELUM_DIBAYAR",
        email,
        id_method: selectedWallet === 0 ? 1 : selectedWallet,
      };

      if (selectedMethod === "cash") {
        payload.uang_masuk = cashAmount ?? 0;
        if (order?.total_price && parseInt(cashAmount) < order?.total_price) {
          payload.status = "BELUM_LUNAS";
        }
      }

      if (selectedMethod === "online") {
        payload.va = virtualAccount;
      }

     
      // payload
      const jsonPayload = JSON.stringify(payload);

      const { data } = await put(url, jsonPayload, TOKEN);
      if (data?.status) {
        const urlUpdate = `${BASE_API_URL}/order/${id}`;
        const payloadUpdate: any = {
          status: "PAID",
        };
        const jsonPayloadUpdate = JSON.stringify(payloadUpdate);

        const res = await put(urlUpdate, jsonPayloadUpdate, TOKEN);
        if (res.data.status) {
          Swal.fire({
            title: "Success",
            text: "You won't be able to revert this!",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok"
          }).then((result) => {
            if (result.isConfirmed) {
             
              router.push("/");
            }
          });
        }
        
      } else {
      
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectedMethod = async (e: any) => {
    setShowInputcard(false);
    setShowVaNumber(false);
    let value = e;
    setSelectedMethod(value);
    if (value === "online") {
      const result = await getMethod("VIRTUAL");
      if (result) {
        setOnlineMethod(result);
        setShowDebitMethod(false);
        setShowOnlineMethod(true);
        setSelectedWallet(0);
      }
    }
    
  };


  const handleSelectedWallet = (id: any) => {
    setSelectedWallet(id);
    setCardNumber("");
    if (showOnlineMethod) {
      setShowVaNumber(true);
      const VaNumber = `${id}00${defaultVaNumber}`;
      setVirtualAccount(VaNumber);
    }
    if (showDebitMethod) {
      setShowInputcard(true);
    }
  };

  return (
    <div className="flex bg-white h-screen w-screen font-poppins">
      <div className="my-6 flex ml-8 cursor-pointer h-fit items-center hover:opacity-70 transition-all">
        <IoChevronBackOutline size={24} />
        <button className="text-lg" onClick={() => history.back()}>
          Back
        </button>
      </div>
      <div className="basis-2/3  pl-5 pr-16 py-20  flex flex-col">
        <h1 className="text-4xl font-semibold">Payment details</h1>
        <label htmlFor="" className="mt-6" typeof="email">
          Email address
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Your email"
          className="w-[100%] p-2 border rounded-lg mt-1"
        />
        
        <div>
          <label className="mt-4 mb-5 block">Payment Method</label>
          <div className="flex flex-wrap gap-6">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`group flex items-center gap-4 py-3 px-14 border-4 w-lg rounded-lg cursor-pointer transition-all ${
                  selectedMethod === method.id
                    ? "border-orange-400 text-orange-400"
                    : "border-[#F1F0F5] text-[#636978]"
                } hover:border-orange-400 hover:text-orange-400`}
                onClick={() => handleSelectedMethod(method.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current w-7 h-7 group-hover:fill-orange-400"
                  viewBox="0 -960 960 960"
                >
                  <path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z" />
                </svg>
                <h1 className="text-lg group-hover:text-orange-400">
                  {method.label}
                </h1>
              </div>
            ))}
          </div>

          {selectedMethod === "cash" && (
            <input
              type="number"
              placeholder="Enter cash amount"
              className="mt-4 p-2 border rounded w-full"
              onChange={(e) => setCashAmount(e.target.value)}
            />
          )}

          {selectedMethod === "debit" && (
            <div className="mt-4 text-gray-600">
              **** **** ****{" "}
              {showDebitMethod && (
                <div className="flex flex-wrap gap-6">
                  {DebitMethod?.map((element) => (
                    <div
                      key={element.id}
                      className={`group flex items-center gap-4 py-3 px-14 border-4 w-lg rounded-lg cursor-pointer transition-all ${
                        selectedWallet === element.id
                          ? "border-orange-400 text-orange-400"
                          : "border-[#F1F0F5] text-[#636978]"
                      } hover:border-orange-400 hover:text-orange-400`}
                      onClick={() => handleSelectedWallet(element.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-current w-7 h-7 group-hover:fill-orange-400"
                        viewBox="0 -960 960 960"
                      >
                        <path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z" />
                      </svg>
                      <h1 className="text-lg group-hover:text-orange-400">
                        {element.nama}
                      </h1>
                    </div>
                  ))}
                </div>
              )}
              {showInputCard && (
                <div>
                  {" "}
                  <label htmlFor="" className="mt-6">
                    Card Number
                  </label>
                  <input
                    onChange={(e) => setCardNumber(e.target.value)}
                    type="text"
                    placeholder="Your Card Number"
                    className="w-[100%] p-2 border rounded-lg mt-1"
                  />
                </div>
              )}
            </div>
          )}

          {selectedMethod === "online" && (
            <div className="mt-4 text-gray-600">
              Transfer to:{" "}
              {showOnlineMethod && (
                <div className="flex flex-wrap gap-6">
                  {onlineMethod?.map((element) => (
                    <div
                      key={element.id}
                      className={`group flex items-center gap-4 py-3 px-14 border-4 w-lg rounded-lg cursor-pointer transition-all ${
                        selectedWallet === element.id
                          ? "border-orange-400 text-orange-400"
                          : "border-[#F1F0F5] text-[#636978]"
                      } hover:border-orange-400 hover:text-orange-400`}
                      onClick={() => handleSelectedWallet(element.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-current w-7 h-7 group-hover:fill-orange-400"
                        viewBox="0 -960 960 960"
                      >
                        <path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z" />
                      </svg>
                      <h1 className="text-lg group-hover:text-orange-400">
                        {element.nama}
                      </h1>
                    </div>
                  ))}
                </div>
              )}
              <p>{showVaNumber && virtualAccount}</p>
            </div>
          )}
        </div>

        <button
          className="w-[100%] mt-4 p-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 disabled:bg-gray-400"
          onClick={payOrder}
          disabled={false}
        >
          Bayar Sekarang
        </button>
      </div>
      <div className="basis-1/2 p-4 h-screen w-full">
      <div className="bg-[#f7f7f7] p-10 rounded-lg w-full h-full shadow-md">
  {/* total */}
  <div className="flex flex-col items-center">
    <h2 className="text-xl font-semibold text-gray-700">Total Amount</h2>
    <h1 className="text-5xl font-bold text-primary my-3">
      Rp. {order?.total_price.toLocaleString()}
    </h1>
  </div>

  {/* order summary */}
  <div className="px-4 my-8">
    <h2 className="text-center text-2xl font-bold mb-10 text-gray-800">
      Order Summary
    </h2>

    {/* header */}
    <div className="grid grid-cols-4 text-sm font-semibold border-b pb-2 text-gray-600">
      <p className="col-span-1">Menu</p>
      <p className="col-span-1 text-center">Qty</p>
      <p className="col-span-1 text-center">Price</p>
      <p className="col-span-1 text-right">Subtotal</p>
    </div>

    {/* item list */}
    <div className="mt-3 space-y-3 text-sm text-gray-700">
      {order?.transaction_detail?.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-4 items-center"
        >
          <p className="col-span-1 capitalize">{item.menu.name}</p>
          <p className="col-span-1 text-center">x{item.quantity}</p>
          <p className="col-span-1 text-center">Rp. {item.price.toLocaleString()}</p>
          <p className="col-span-1 text-right">
            Rp. {item.subTotal.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  </div>

  {/* total */}
  <div className="grid grid-cols-4 border-t pt-4 px-4 text-gray-800">
    <div className="col-span-3 text-right text-lg font-semibold">Total</div>
    <div className="col-span-1 text-right text-lg font-bold text-primary">
      Rp. {order?.total_price.toLocaleString()}
    </div>
  </div>
</div>



      </div>
    </div>
  );
}
