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

  // 비로그인 상태라면 토큰 쿠키를 모두 삭제하고 로그인 페이지로 리다이렉트
  if (!isAuth) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("next", req.nextUrl.pathname);

    const res = NextResponse.redirect(redirectUrl);
    // 토큰 쿠키들 삭제 - dev, renewal 서버 혼용해서 사용중이므로 관련 토큰 전부 삭제 추후에는 LOGIN_COOKIE 제거
    [
      AUTH_CONFIG.ACCESS_TOKEN_COOKIE,
      AUTH_CONFIG.REFRESH_TOKEN_COOKIE,
      AUTH_CONFIG.LOGIN_COOKIE,
    ].forEach((cookieName) => {
      res.cookies.set(cookieName, "", {
        path: "/",
        maxAge: 0,
      });
    });
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|images|api|static|login).*)"],
};
