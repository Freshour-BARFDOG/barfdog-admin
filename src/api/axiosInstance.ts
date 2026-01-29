import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { getCookie, setCookie } from "@/utils/auth/cookie";
import { AUTH_CONFIG } from "@/constants/auth";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 환경에 따른 baseURL 설정
const prod = process.env.NODE_ENV === "production";
const baseURL = prod
  ? process.env.NEXT_PUBLIC_API_URL_PRODUCT
  : process.env.NEXT_PUBLIC_API_URL_DEV;

/**
 * 일반 API 요청에 사용할 axios 인스턴스
 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const publicAxios: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const isClient = typeof window !== "undefined";

/**
 * 요청 인터셉터:
 * 모든 요청 시 쿠키에 저장된 액세스 토큰을 Authorization 헤더에 추가합니다.
 */
// if (isClient) {
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (isClient) {
      // const token = getCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
      const token = getCookie(AUTH_CONFIG.LOGIN_COOKIE);

      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = token.startsWith("Bearer ")
          ? token
          : `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * 응답 인터셉터:
 * 401(Unauthorized) 에러 발생 시 /api/refresh 엔드포인트에 액세스 토큰 재발급 요청 후,
 * 새 토큰으로 원본 요청을 재시도합니다.
 */

// 재발급 요청 중 동시 발생하는 요청들을 처리하기 위한 변수와 큐
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

/**
 * 재발급 요청 후 실패 큐에 대기 중인 요청들을 처리합니다.
 * @param error - 재발급 요청 실패 시 에러 객체
 * @param token - 재발급 요청 성공 시 새 액세스 토큰
 */
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }
      isRefreshing = true;
      return publicAxios
        .get(`/api/refresh`)
        .then(({ data }) => {
          const newToken: string = data.accessToken;
          setCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE, newToken);
          axiosInstance.defaults.headers.common["Authorization"] =
            `Bearer ${newToken}`;
          processQueue(null, newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        })
        .catch((refreshError) => {
          processQueue(refreshError, null);
          return Promise.reject(refreshError);
        })
        .finally(() => {
          isRefreshing = false;
        });
    }
    return Promise.reject(error);
  },
);
// }

export default axiosInstance;
