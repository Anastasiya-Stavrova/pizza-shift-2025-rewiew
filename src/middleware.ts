import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { COOKIES, ROUTES } from "@/constants";

const authRedirectUrls: string[] = [
  ROUTES.PROFILE,
  ROUTES.ORDERS,
  ROUTES.PAYMENT,
  ROUTES.BASKET,
];

export const middleware = async (request: NextRequest) => {
  const token = request.cookies.get(COOKIES.AUTH)?.value;

  if (!token && authRedirectUrls.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(ROUTES.AUTH, request.url));
  }

  return NextResponse.next();
};
