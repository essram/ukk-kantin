// import { IMenu } from "@/app/types";
// import { getCookies } from "../../../lib/server-cookies";
// import { BASE_API_URL, BASE_IMAGE_MENU } from "@/global";
// import { get } from "@/lib/api-bridge";
// import Alert from "../../../components/alert/page";
// import Image from "next/image";
// import Search from "../../../components/menu/Search";

// const getMenu = async (search: string): Promise<IMenu[]> => {
//   try {
//     const TOKEN = await getCookies("token");
//     const url = `${BASE_API_URL}/menu?search=${search}`;
//     const { data } = await get(url, TOKEN);
//     let result: IMenu[] = [];
//     if (data?.status) result = [...data.data];
//     return result;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

// const MenuPage = async ({
//   searchParams,
// }: {
//   searchParams: { [key: string]: string | string[] | undefined };
// }) => {
//   const search = searchParams.search ? searchParams.search.toString() : ``;
//   const menu: IMenu[] = await getMenu(search);
//   const category = (cat: string): React.ReactNode => {
//     if (cat === "FOOD") {
//       return (
//         <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
//           Food
//         </span>
//       );
//     }
//     if (cat === "SNACK") {
//       return (
//         <span className="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
//           Snack
//         </span>
//       );
//     }
//     return (
//       <span className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
//         Drink
//       </span>
//     );
//   };
//   return (
    
//   );
// };
// export default MenuPage;