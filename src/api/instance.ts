import axios from "axios";

import { API_URL, COOKIES } from "@/constants";
import { getCookie, isSSR } from "@/utils";

export const instance = axios.create({
  baseURL: API_URL,
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
