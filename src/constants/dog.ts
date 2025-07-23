import { DogListRequest, DogsCategory, DogsSubscribeStatus } from "@/types/dog";

const INITIAL_DOGS_REQUEST: DogListRequest = {
  memberName: "", // 견주 이름
  dogName: "", // 반려견 이름
  memberEmail: "", // 견주 ID
  subscribeStatus: "ALL", // 구독 상태
  isDeleted: "", // 삭제 여부
};

const DOGS_CATEGORY: {
  label: string;
  value: keyof DogsCategory;
}[] = [
  { label: "반려견명", value: "dogName" },
  { label: "견주 이름", value: "memberName" },
  { label: "견주 ID", value: "memberEmail" },
];

const DOGS_SUBSCRIBE_STATUS: {
  label: string;
  value: DogsSubscribeStatus;
}[] = [
  { label: "전체", value: "ALL" },
  { label: "구독", value: "SUBSCRIBING" },
  { label: "비구독", value: "NONSUBSCRIBING" },
];

const DOGS_DELETED_STATUS: {
  label: string;
  value: string;
}[] = [
  { label: "전체", value: "" },
  { label: "삭제", value: "true" },
  { label: "비삭제", value: "false" },
];

export {
  INITIAL_DOGS_REQUEST,
  DOGS_CATEGORY,
  DOGS_SUBSCRIBE_STATUS,
  DOGS_DELETED_STATUS,
};
