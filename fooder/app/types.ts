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
  orderlist: OrderItem[];
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
  note: string;
  dine_in: number;
  user: IUser;
  orderlist: OrderItem[];
  nomor_meja: iNoMeja;
  PaymentOrder: PaymentOrder;
}

export interface IstOrder {
  totalPesanan :number;
  todayOrder: number;
  totalOrderBulanIni: number;
  sumTodayOrder: number;
  sumMonthlyOrder: number;
}
