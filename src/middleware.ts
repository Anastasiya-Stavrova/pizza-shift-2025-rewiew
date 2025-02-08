import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { COOKIES, ROUTES } from "@/constants";

const authRedirectUrls: string[] = [
  ROUTES.PROFILE,
  ROUTES.PAYMENT,
  ROUTES.BASKET,
];

export const middleware = async (request: NextRequest) => {
  const authToken = request.cookies.get(COOKIES.AUTH)?.value;

  if (
    !authToken &&
    (authRedirectUrls.includes(request.nextUrl.pathname) ||
      request.nextUrl.pathname.startsWith("/orders"))
  ) {
    return NextResponse.redirect(new URL(ROUTES.AUTH, request.url));
  }

  return NextResponse.next();
};
