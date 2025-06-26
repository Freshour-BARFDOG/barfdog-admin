import { AUTH_CONFIG } from "@/constants/auth";
import axios, {AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults} from "axios";
import { cookies } from "next/headers";

export async function createSSRRequest(): Promise<AxiosInstance> {
  const cookieStore = await cookies();

  const token =
    cookieStore.get(AUTH_CONFIG.ACCESS_TOKEN_COOKIE as any)?.value ??
    cookieStore.get(AUTH_CONFIG.LOGIN_COOKIE as any)?.value;

  const prod = process.env.NODE_ENV === 'production';
  const baseURL = prod
    ? process.env.NEXT_PUBLIC_API_URL_PRODUCT
    : process.env.NEXT_PUBLIC_API_URL_DEV;

  const config: AxiosRequestConfig = {
    baseURL,
    timeout: 5000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      ...(token
        ? {
          Authorization: token.startsWith('Bearer ')
            ? token
            : `Bearer ${token}`,
        }
        : {}),
    },
  };

  return axios.create(config as CreateAxiosDefaults);
}