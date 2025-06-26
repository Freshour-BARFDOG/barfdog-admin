import Cookies from 'js-cookie';

export interface CookieOptions {
  expires?: number | Date; // 숫자: 유효기간(일) 또는 Date 객체
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

const defaultCookieOptions: CookieOptions = {
	expires: 10,
  path: '/',
  sameSite: 'none',
  secure: true,
};


export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};


export const setCookie = (name: string, value: string, options?: CookieOptions): void => {
  const cookieOptions = { ...defaultCookieOptions, ...options };
  Cookies.set(name, value, cookieOptions);
};


export const deleteCookie = (name: string): void => {
  Cookies.remove(name);
};