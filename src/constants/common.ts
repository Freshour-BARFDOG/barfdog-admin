import { format } from "date-fns";

const PAGE_SIZE = {
  COMMON: 10,
  SALES: {
    ORDERS: 50,
    DELIVERY: 10,
  },
  REWARDS: {
    COUPON: 10,
    REWARD: 10,
    PROMOTION: 10,
  },
};

const OLDEST_DATE = format(new Date("2000-01-01"), "yyyy-MM-dd");
const TODAY = format(new Date(), "yyyy-MM-dd");

const DISCOUNT_UNIT_TYPE = {
  FIXED_RATE: "%",
  FLAT_RATE: "원",
} as const;

const DISCOUNT_UNIT_TYPE_LIST = Object.entries(DISCOUNT_UNIT_TYPE).map(
  ([value, label]) => ({ label, value })
);

const UNLIMITED_VALUE = 99999;

const SEARCH_CATEGORY = [
  { label: "아이디", value: "email" },
  { label: "이름", value: "name" },
];

const AREA = {
  ALL: "전체",
  METRO: "수도권",
  NON_METRO: "비수도권",
};
const AREA_LIST = Object.entries(AREA).map(([value, label]) => ({
  label,
  value,
}));

export {
  PAGE_SIZE,
  OLDEST_DATE,
  TODAY,
  DISCOUNT_UNIT_TYPE,
  DISCOUNT_UNIT_TYPE_LIST,
  UNLIMITED_VALUE,
  SEARCH_CATEGORY,
  AREA,
  AREA_LIST,
};
