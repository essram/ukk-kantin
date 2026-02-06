import React from "react";

interface InvoicePopupProps {
  isOpen: boolean;
  onClose: () => void;
  paymentDate: string;
  totalAmount: number;
  customerName: string;
  paymentMethod: string;
  lastFourDigits?: string;
  virtualAccount?: string;
  transactionType: string;
  orderUUID: string;
}

const InvoicePopup: React.FC<InvoicePopupProps> = ({
  isOpen,
  onClose,
  paymentDate,
  totalAmount,
  customerName,
  paymentMethod,
  lastFourDigits,
  virtualAccount,
  transactionType,
  orderUUID,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4 text-center">Pembayaran Berhasil</h2>
        <p><strong>Tanggal:</strong> {paymentDate}</p>
        <p><strong>Nama:</strong> {customerName}</p>
        <p><strong>Jenis Transaksi:</strong> {transactionType}</p>
        <p><strong>Total Dibayarkan:</strong> Rp {totalAmount.toLocaleString()}</p>
        {paymentMethod === "debit" && <p><strong>Kartu:</strong> **** **** **** {lastFourDigits}</p>}
        {paymentMethod === "virtual" && <p><strong>VA Tujuan:</strong> {virtualAccount}</p>}
        <p><strong>UUID Pemesanan:</strong> {orderUUID}</p>

        <button
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default InvoicePopup;
