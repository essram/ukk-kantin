import React from "react";

interface InvoiceProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
  paymentDate: string;
  totalAmount: number;
  paymentMethod: "cash" | "virtual_account" | "debit";
  transaction_detail: string;
  orderUUID: string;
}

const InvoicePopup: React.FC<InvoiceProps> = ({
  isOpen,
  onClose,
  customerName,
  paymentDate,
  totalAmount,
  paymentMethod,
  transaction_detail,
  orderUUID,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Pembayaran Berhasil</h2>
        <p className="text-gray-700">Tanggal: <span className="font-semibold">{paymentDate}</span></p>
        <p className="text-gray-700">Nama Customer: <span className="font-semibold">{customerName}</span></p>
        <p className="text-gray-700">Total Bayar: <span className="font-semibold">Rp {totalAmount.toLocaleString()}</span></p>
        
        <p className="text-gray-700">Metode Pembayaran: 
          <span className="font-semibold capitalize"> {paymentMethod.replace("_", " ")}</span>
        </p>
        {paymentMethod === "debit" && (
          <p className="text-gray-700">Nomor Kartu: **** **** **** {transaction_detail}</p>
        )}
        {paymentMethod === "virtual_account" && (
          <p className="text-gray-700">VA Tujuan: {transaction_detail}</p>
        )}
        
        <p className="text-gray-700">UUID Pemesanan: <span className="font-semibold text-sm">{orderUUID}</span></p>

        <button 
          onClick={onClose} 
          className="bg-orange-500 text-white py-2 px-4 w-full mt-4 rounded-lg hover:bg-orange-600 transition-all">
          OK
        </button>
      </div>
    </div>
  );
};

export default InvoicePopup;
