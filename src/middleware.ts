import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./app/lib";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = path.includes("/dashboard");
  const session = await getSession();

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/logind", req.nextUrl));
  }

  return NextResponse.next();
}