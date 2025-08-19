import {
  ProbiomeActualStatus,
  ProbiomeCategory,
  ProbiomeStatus,
  ProbiomeStatusConfig,
} from "@/types/diagnosis";
import { OLDEST_DATE, TODAY } from "./common";

const PROBIOME_CATEGORY: {
  label: string;
  value: ProbiomeCategory;
}[] = [
  { label: "견주 이름", value: "memberName" },
  { label: "반려견명", value: "dogName" },
  { label: "시리얼 번호", value: "serialNumber" },
];

const INITIAL_PROBIOME_REQUEST = {
  from: OLDEST_DATE,
  to: TODAY,
  memberName: null, // 구매자 이름
  dogName: null, // 반려견 이름
  serialNumber: null,
  status: "ALL" as ProbiomeStatus,
};

const PROBIOME_STATUS: {
  label: string;
  value: ProbiomeStatus;
}[] = [
  { label: "전체", value: "ALL" },
  { label: "문진 작성완료", value: "SUBMITTED" },
  { label: "회수 요청", value: "KIT_PICKUP_REQUESTED" },
  { label: "회수 완료", value: "KIT_PICKUP_DONE" },
  { label: "분석중", value: "ANALYZING" },
  { label: "결과지 업로드 완료", value: "COMPLETED" },
];

const PROBIOME_STATUS_CONFIG: Record<
  ProbiomeActualStatus,
  ProbiomeStatusConfig
> = {
  SUBMITTED: {
    label: "문진 작성완료",
    chipColor: "gray100",
  },
  KIT_PICKUP_REQUESTED: {
    label: "회수 신청",
    chipColor: "lightPink",
  },
  KIT_PICKUP_DONE: {
    label: "회수 완료",
    chipColor: "lightPink",
  },
  ANALYZING: {
    label: "분석 중",
    chipColor: "blue50",
  },
  COMPLETED: {
    label: "결과지 업로드 완료",
    chipColor: "blue50",
  },
};

export {
  PROBIOME_CATEGORY,
  INITIAL_PROBIOME_REQUEST,
  PROBIOME_STATUS,
  PROBIOME_STATUS_CONFIG,
};
