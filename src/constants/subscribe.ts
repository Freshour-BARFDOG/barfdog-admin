import { SubscribeHistoryRequest } from "@/types/subscribe";

const INITIAL_SUBSCRIBE_HISTORY_REQUEST = {
  memberName: "", // 견주 이름
  dogName: "", // 반려견 이름
  email: "", // 견주 ID
  id: "", // 구독 ID
};

const SUBSCRIBE_HISTORY_CATEGORY: {
  label: string;
  value: keyof SubscribeHistoryRequest;
}[] = [
  { label: "반려견명", value: "dogName" },
  { label: "견주 이름", value: "memberName" },
  { label: "견주 ID", value: "email" },
  { label: "구독 ID", value: "id" },
];

const SUBSCRIBE_STATUS = {
  BEFORE_PAYMENT: "구독 전",
  SURVEY_COMPLETED: "설문 완료",
  SUBSCRIBE_WILL_CANCEL: "구독 취소 예정",
  SUBSCRIBE_CANCEL: "구독 취소",
  SUBSCRIBING: "구독 중",
  SUBSCRIBE_PENDING: "구독 보류",
};

export {
  INITIAL_SUBSCRIBE_HISTORY_REQUEST,
  SUBSCRIBE_HISTORY_CATEGORY,
  SUBSCRIBE_STATUS,
};
