import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth/auth";
import { setCookie } from "@/utils/auth/cookie";
import { AUTH_CONFIG } from "@/constants/auth";
import { UseMutationCustomOptions } from "@/types/common";

export function useEmailLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: async (formData: { email: string; password: string }) => {
      try {
        const result = await login({
          email: formData.email,
          password: formData.password,
        });

        const token = result.headers.authorization;
        const data = result.data;

        if (!token) {
          throw new Error("토큰이 제공되지 않았습니다.");
        }
        setCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE, token);
        setCookie(AUTH_CONFIG.LOGIN_COOKIE, token);

        return data;
      } catch (error) {
        const errorMessage =
          axios.isAxiosError(error) && error.response
            ? error.response.data?.errors?.[0].defaultMessage ||
              "로그인에 실패했습니다."
            : "네트워크 오류가 발생했습니다.";

        alert(errorMessage);
        throw new Error(String(error));
      }
    },
    onSuccess: async (data) => {
      console.log("로그인 성공", data);
    },
    onError: (error) => {
      console.log("로그인 실패", error);
    },
    ...mutationOptions,
  });
}
