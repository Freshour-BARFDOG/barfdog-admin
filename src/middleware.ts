import { NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIG } from "@/constants/auth";
import { isAuthenticated } from "./utils/auth/isAuthenticated";

export async function middleware(req: NextRequest) {
  console.log("요청된 URL:", req.url);

  const token = req.cookies.get(AUTH_CONFIG.ACCESS_TOKEN_COOKIE)?.value;
  const isAuth = isAuthenticated(token);
  const { pathname } = new URL(req.url);


  // 로그인한 사용자가 '/login'에 직접 접근한 경우 메인 페이지로 리디렉트
  if (pathname === "/login" && isAuth) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  if (!isAuth) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/login';
    redirectUrl.searchParams.set('next', req.nextUrl.pathname); // 현재 경로 저장
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|favicon.ico|images|api|static|login).*)',
  ],
};
