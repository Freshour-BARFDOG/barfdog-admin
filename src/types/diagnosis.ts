interface ProbiomeRequest {
  from: string; // yyyy-MM-dd
  to: string; // yyyy-MM-dd
  memberName: string | null; // 구매자 이름
  dogName: string | null; // 반려견 이름
  serialNumber: string | null;
  status: ProbiomeStatus;
}

type ProbiomeActualStatus =
  | "SUBMITTED"
  | "KIT_PICKUP_REQUESTED"
  | "KIT_PICKUP_DONE"
  | "ANALYZING"
  | "COMPLETED";

type ProbiomeStatus = "ALL" | ProbiomeActualStatus;

interface ProbiomeParams {
  /** body 에는 검색 필터값 전부 */
  body: ProbiomeRequest;
  /** 0부터 시작하는 페이지 번호 (기본값 0) */
  page?: number;
  /** 페이지당 사이즈 (기본값 50) */
  size?: number;
}

type ProbiomeCategory = Exclude<
  keyof ProbiomeRequest,
  "from" | "to" | "status"
>;

interface ProbiomeListResponse {
  id: number;
  memberName: string;
  phoneNumber: string;
  email: string;
  status: ProbiomeActualStatus;
  dogName: string;
  serialNumber: string;
  submitDate: string;
}

interface ProbiomeStatusConfig {
  label: string;
  chipColor: "gray100" | "lightPink" | "blue50";
}

export type {
  ProbiomeRequest,
  ProbiomeStatus,
  ProbiomeActualStatus,
  ProbiomeParams,
  ProbiomeCategory,
  ProbiomeListResponse,
  ProbiomeStatusConfig,
};
