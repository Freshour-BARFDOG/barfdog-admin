const queryKeys = {
  COMMON: {
    BASE: "common",
    UPLOAD_IMAGE: "uploadImage",
  },
  MEMBER: {
    BASE: "member",
    GET_MEMBER_LIST: "getMemberList",
  },
  ORDERS: {
    BASE: "orders",
    SEARCH_ORDERS: "searchOrders",
  },
} as const;

export { queryKeys };
