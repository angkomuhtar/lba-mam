// export { auth as middleware } from "@/auth";

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // const response = NextResponse.next();

  // response.headers.set(
  //   "Access-Control-Allow-Origin",
  //   "https://lba.mitraabadimahakam.id"
  // );
  // response.headers.set(
  //   "Access-Control-Allow-Methods",
  //   "GET, POST, PUT, DELETE"
  // );
  // response.headers.set(
  //   "Access-Control-Allow-Headers",
  //   "Content-Type, Authorization"
  // );
  // response.headers.set("Access-Control-Allow-Credentials", "true");

  // return response;
  // Allow access to the signin page
  const session = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (pathname === "/signin") {
    if (session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // If no session, redirect to /signin
  if (!session) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  // If session exists, allow the request to continue
  return NextResponse.next();
}

// Specify the paths to apply the middleware
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
