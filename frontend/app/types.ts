import { Stringifier } from "postcss";

export interface IMenu {
  id: number;
  uuid: string;
  name: string;
  price: number;
  picture: string;
  description: string;
  category?: iCategory;
  id_category: number;
  createdAt: string;
  updatedAt: string;
  diskon?: IDiskon | null;
  finalPrice?: number;
}

export interface IDiskon {
  is_active: IDiskon | null | undefined;
  id: number;
  nama_diskon: string;
  persentase_diskon: number;
  tanggal_awal: string;
  tanggal_akhir: string;

}

export interface IUser {
  id: number;
  uuid: string;
  name: string;
  email: string;
  password: string;
  profil_picture: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface IStan {
  id: number;
  uuid: string;
  nama: string;
  nama_pemilik: string;
  no_telp: string;
}

export interface IChart {
  id: number;
  title: string;
  price: number;
  image: string;
  qty: number;
}

export interface iNoMeja {
  id: number;
  nomor: string;
}
export interface iCategory {
  id: number;
  name: string;
  icon: string;
  bg_color: string;
  text_color: string;
}

export interface iOrder {
  id: number;
  uuid: string;
  customer: string;
  table_number: string;
  total_price: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  transaction_detail: OrderItem[];
}

export interface IPayMethod {
  id: number;
  tipe: string;
  nama: string;
  logo: string;
}

interface OrderItem {
  id: number;
  uuid: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  menuId: number;
  orderId: number;
  price : number;
  subTotal : number;
  menu: IMenu;

}

interface PaymentOrder {
  id: number;
  id_order: number;
  id_method: number;
  uang_masuk: string;
  va: string;
  nomor_kartu: string;
  status: string;
  created_at: string;
  email: string;
  paymentMethod: IPayMethod;
}

export interface OrderResponse {
  id: number;
  uuid: string;
  customer: string;
  table_number: number;
  total_price: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  stanId: number;
  note: string;
  dine_in: number;
  user: IUser;
  transaction_detail: OrderItem[];
  // nomor_meja: iNoMeja;
  PaymentOrder: PaymentOrder;
}

export interface IstOrder {
  totalPesanan: number;
  todayOrder: number;
  totalOrderBulanIni: number;
  sumTodayOrder: number;
  sumMonthlyOrder: number;
}
