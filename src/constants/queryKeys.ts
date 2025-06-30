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
  COUPONS: {
    BASE: "coupon",
    GET_COUPON_LIST: 'getCouponList',
    GET_MEMBER_COUPON_LIST: 'getMemberCouponList',
    GET_PUBLICATION_COUPON_LIST: 'getPublicationCouponList',
  }
} as const;

export { queryKeys };
