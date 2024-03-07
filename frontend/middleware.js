"use client";
import { NextResponse } from "next/server";

export default function middleware(req) {
  let loggedin = req.cookies.get("token");
  const { pathname } = req.nextUrl;

  if (
    loggedin &&
    (pathname === "/auth/sign-in" || pathname === "/auth/sign-up")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    !loggedin &&
    pathname !== "/auth/sign-in" &&
    pathname !== "/auth/sign-up"
  ) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
