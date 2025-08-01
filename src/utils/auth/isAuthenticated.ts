import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp?: number; // 만료 시간(초 단위)
}

/**
 * 전달받은 토큰의 존재 및 만료 여부를 검사
 * 토큰이 존재하고, 디코딩에 성공하며, 만료되지 않았다면 true를 반환
 *
 * @param token - JWT 토큰 문자열
 * @returns 토큰이 유효하면 true, 그렇지 않으면 false
 */
export function isAuthenticated(token?: string): boolean {
  if (!token || token.trim() === "") {
    return false;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now();
    if (decoded.exp && currentTime >= decoded.exp * 1000) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
}
