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
  COUPONS: {
    BASE: "coupon",
    GET_COUPON_LIST: 'getCouponList',
    GET_MEMBER_COUPON_LIST: 'getMemberCouponList',
    GET_PUBLICATION_COUPON_LIST: 'getPublicationCouponList',
  }
} as const;

export { queryKeys };

