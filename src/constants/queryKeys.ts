const queryKeys = {
  COMMON: {
    BASE: "common",
    UPLOAD_IMAGE: "uploadImage",
  },
  MEMBER: {
    BASE: "member",
    GET_MEMBER_LIST: "getMemberList",
    GET_MEMBER_DETAIL: "getMemberDetail",
    GET_MEMBER_SUBSCRIPTION_LIST: "getMemberSubscriptionList",
  },
  SALES: {
    BASE: "sales",
    GET_SEARCH: "getSearch",
    GET_DETAIL_GENERAL: "getDetailGeneral",
  },
  GOODSFLOW: {
    BASE: "goodsflow",
    GET_TRACE_RESULTS: "getTraceResults",
  },
} as const;

export { queryKeys };
