import axios from "axios";

import { getCookie, isSSR } from "@/utils";
import { COOKIES } from "@/constants";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(async config => {
  let token: string | undefined;
  if (isSSR) {
    const cookies = (await import("next/headers")).cookies;
    const cookieStore = cookies();
    token = (await cookieStore).get(COOKIES.AUTH)?.value;
  } else {
    token = getCookie(COOKIES.AUTH);
  }

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});
