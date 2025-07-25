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
  PRODUCTS: {
    BASE: "products",
    GET_GENERAL_PRODUCT_LIST: "getGeneralProductList",
    GET_ALLIANCE_LIST: "getAllianceList",
    GET_GENERAL_PRODUCT_DETAIL: "getGeneralProductDetail",
    GET_RECIPE_LIST: "getRecipeList",
    GET_INGREDIENT_LIST: "getIngredientList",
    GET_RECIPE_DETAIL: "getRecipeDetail",
  },
  PROMOTIONS: {
    BASE: "promotion",
    GET_PROMOTION_LIST: "getPromotionList",
    GET_PROMOTION_DETAIL: "getPromotionDetail",
    GET_PROMOTION_MEMBER_LIST: "getPromotionMemberList",
    GET_PROMOTION_COUPON_LIST: "getPromotionCouponList",
  },
  BANNERS: {
    BASE: "banners",
    GET_MYPAGE_BANNER: "getMyPageBanner",
    GET_TOP_BANNER: "getTopBanner",
    GET_MAIN_BANNER_LIST: "getMainBannerList",
    GET_MAIN_BANNER_DETAIL: "getMainBannerDetail",
    GET_POPUP_LIST: "getPopupList",
    GET_POPUP_DETAIL: "getPopupDetail",
  },
  COMMUNITY: {
    BASE: "community",
    GET_NOTICE_LIST: "getNoticeList",
    GET_NOTICE_DETAIL: "getNoticeDetail",
    GET_ARTICLE_LIST: "getArticleList",
    GET_ARTICLE_DETAIL: "getArticleDetail",
    GET_RECOMMEND_ARTICLE: "getRecommendArticle",
    GET_EVENT_LIST: "getEventList",
    GET_EVENT_DETAIL: "getEventDetail",
    GET_INQUIRY_LIST: "getInquiryList",
    GET_INQUIRY_DETAIL: "getInquiryDetail",
  },
  SUBSCRIBE: {
    BASE: "subscribe",
    GET_SUBSCRIBE_HISTORY: "getSubscribeHistory",
    GET_SUBSCRIBE_DETAIL: "getSubscribeDetail",
  },
  DOGS: {
    BASE: "dogs",
    GET_DOG_LIST: "getDogList",
    GET_DOG_DETAIL: "getDogDetail",
  },
  POLICIES: {
    BASE: "policies",
    GET_POLICIES: "getPolicies",
    GET_AUTO_COUPONS: "getAutoCoupons",
    GET_COUPON_POLICY: "getCouponPolicy",
    GET_PLAN_DISCOUNT: "getPlanDiscount",
  },
  ALLIANCE: {
    BASE: "alliance",
    GET_ALLIANCE_MEMBER_LIST: "getAllianceMemberList",
    GET_ALLIANCE_SALES_LIST: "getAllianceSalesList",
    GET_ALLIANCE_MANAGEMENT: "getAllianceManagement",
    GET_ALLIANCE_DETAIL: "getAllianceDetail",
    GET_ALLIANCE_COUPON_LIST: "getAllianceCouponList",
    GET_ALLIANCE_COUPON_DETAIL: "getAllianceCouponDetail",
    GET_ALLIANCE_EVENT_LIST: "getAllianceEventList",
  },
  REVIEW: {
    BASE: "review",
    GET_REVIEW_LIST: "getReviewList",
    GET_REVIEW_DETAIL: "getReviewDetail",
    GET_BEST_REVIEW_LIST: "getBestReviewList",
    GET_PRODUCT_ITEM_LIST: "getProductItemList",
  }
  
} as const;

export { queryKeys };
