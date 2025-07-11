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
  COUPONS: {
    BASE: "coupon",
    GET_COUPON_LIST: "getCouponList",
    GET_MEMBER_COUPON_LIST: "getMemberCouponList",
    GET_PUBLICATION_COUPON_LIST: "getPublicationCouponList",
  },
  REWARDS: {
    BASE: "reward",
    GET_REWARD_LIST: "getRewardList",
  },
  PROMOTIONS: {
    BASE: "promotion",
    GET_PROMOTION_LIST: "getPromotionList",
    GET_PROMOTION_DETAIL: "getPromotionDetail",
    GET_PROMOTION_MEMBER_LIST: "getPromotionMemberList",
    GET_PROMOTION_COUPON_LIST: "getPromotionCouponList",
  },
  BANNERS: {
    BASE: "BANNERS",
    GET_MYPAGE_BANNER: "getMyPageBanner",
  }
} as const;

export { queryKeys };
