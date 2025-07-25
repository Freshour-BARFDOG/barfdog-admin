// src/hooks/useMutationToast.ts
import { useCallback } from "react";
import { useToastStore } from "@/store/useToastStore";

/**
 * ❇️ 공통 Mutation 헬퍼
 *  - 성공/실패 시 Toast 노출
 *  - 제네릭으로 어떠한 변수 타입에도 대응
 */
export function useMutationToast() {
  const { addToast } = useToastStore();

  return useCallback(
    <T>(
      mutateFn: (
        vars: T,
        options: { onSuccess: () => void; onError: () => void }
      ) => void,
      vars: T,
      successMsg: string,
      errorMsg: string
    ) => {
      mutateFn(vars, {
        onSuccess: () => addToast(successMsg),
        onError: () => addToast(errorMsg),
      });
    },
    [addToast]
  );
}
