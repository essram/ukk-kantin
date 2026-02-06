"use server"
import { cookies } from "next/headers";
export const getCookies = async (key: string): Promise<string> => {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value ?? "";
};
export const setCookies = async (key: string, value: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.set(key, value);
  return token;
};

export const removeCookies = async (key: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.delete(key);
  return token;
};

// export async function getUserToken(key:string) {
//     const cookieStore = await cookies();
//     const token = cookieStore.get(key);

//     return token;
//   }
