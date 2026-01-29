import { ApiResponse } from "@/types/common";

/**
 * API 응답을 검증하고 성공 시 데이터를 반환하는 함수
 * 실패 시 적절한 에러를 던집니다
 * @param data API 응답 데이터
 * @param defaultErrorMessage 기본 에러 메시지
 * @returns 성공 시 API 응답 데이터
 * @throws Error API 요청이 실패한 경우
 */
export const validateApiResponse = <T>(
  data: ApiResponse<T>,
  defaultErrorMessage: string = "API 요청이 실패했습니다."
): T => {
  if (!data.success) {
    const errorMessage =
      data.detailMessage || data.message || defaultErrorMessage;
    const errorCode = data.errorCode || "UNKNOWN_ERROR";
    throw new Error(`${errorCode}: ${errorMessage}`);
  }

  return data.data as T;
};

/**
 * Error 객체에서 사용자에게 보여줄 메시지만 추출하는 함수
 * API에서 던진 에러 메시지에서 에러 코드를 제거하고 사용자 메시지만 반환
 * @param error Error 객체
 * @param defaultMessage 기본 메시지
 * @returns 사용자에게 보여줄 에러 메시지
 */
export const extractErrorMessage = (
  error: unknown,
  defaultMessage: string = "요청 처리 중 오류가 발생했습니다."
): string => {
  if (error instanceof Error) {
    // API에서 던진 에러 메시지에서 사용자 메시지만 추출
    // 형식: "ERROR_CODE: 사용자 메시지" 또는 "사용자 메시지"
    const errorParts = error.message.split(": ");
    return errorParts.length > 1 ? errorParts[1] : errorParts[0];
  }

  return defaultMessage;
};

/**
 * Error 객체에서 에러 코드만 추출하는 함수
 * API에서 던진 에러 메시지에서 에러 코드만 반환
 * @param error Error 객체
 * @param defaultCode 기본 에러 코드
 * @returns 에러 코드
 */
export const extractErrorCode = (
  error: unknown,
  defaultCode: string = "UNKNOWN_ERROR"
): string => {
  if (error instanceof Error) {
    // API에서 던진 에러 메시지에서 에러 코드만 추출
    // 형식: "ERROR_CODE: 사용자 메시지" 또는 "사용자 메시지"
    const errorParts = error.message.split(": ");
    return errorParts.length > 1 ? errorParts[0] : defaultCode;
  }

  return defaultCode;
};
