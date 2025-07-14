import { SelectOption } from "@/types/common";
import {
  GeneralProductCreateType,
  GeneralProductType,
  ItemHealthType,
} from "@/types/products";

const INITIAL_PRODUCTS_REQUEST = {
  itemType: "ALL" as GeneralProductType,
};

const ITEM_HEALTH_TYPE_MAP = {
  DIARRHEA: "잦은 설사",
  WEIGHT_MANAGEMENT: "체중 조절",
  FATIGUE_RECOVERY: "피로 회복",
  VOMITING: "잦은 구토",
  WATER_INTAKE: "음수량 부족",
  COAT_CARE: "모질 관리",
  JOINT_HEALTH: "관절 건강",
  PUPPY_DEVELOPMENT: "자견 발육",
  SENIOR_HEALTH: "노령견 건강",
  NONE: "없음",
} as const;

const ITEM_HEALTH_TYPE_KEYS = Object.keys(
  ITEM_HEALTH_TYPE_MAP
) as ItemHealthType[];

const ITEM_HEALTH_TYPE_OPTIONS: SelectOption<ItemHealthType>[] = [
  { value: "DIARRHEA", label: ITEM_HEALTH_TYPE_MAP.DIARRHEA },
  { value: "WEIGHT_MANAGEMENT", label: ITEM_HEALTH_TYPE_MAP.WEIGHT_MANAGEMENT },
  { value: "FATIGUE_RECOVERY", label: ITEM_HEALTH_TYPE_MAP.FATIGUE_RECOVERY },
  { value: "VOMITING", label: ITEM_HEALTH_TYPE_MAP.VOMITING },
  { value: "WATER_INTAKE", label: ITEM_HEALTH_TYPE_MAP.WATER_INTAKE },
  { value: "COAT_CARE", label: ITEM_HEALTH_TYPE_MAP.COAT_CARE },
  { value: "JOINT_HEALTH", label: ITEM_HEALTH_TYPE_MAP.JOINT_HEALTH },
  { value: "PUPPY_DEVELOPMENT", label: ITEM_HEALTH_TYPE_MAP.PUPPY_DEVELOPMENT },
  { value: "SENIOR_HEALTH", label: ITEM_HEALTH_TYPE_MAP.SENIOR_HEALTH },
  { value: "NONE", label: ITEM_HEALTH_TYPE_MAP.NONE },
];

const GENERAL_PRODUCT_CATEGORY_MAP = {
  ALL: "전체",
  RAW: "생식",
  COOKED: "화식",
  TOPPING: "토핑",
  SNACK: "간식",
  ETC: "기타",
} as const;

/** 2) 맵 키·값을 기반으로 옵션 배열(ALL 포함) 생성 */
const ALL_CATEGORY_ENTRIES = Object.entries(GENERAL_PRODUCT_CATEGORY_MAP) as [
  GeneralProductType,
  string
][];

const GENERAL_PRODUCT_CATEGORY_OPTIONS: SelectOption<GeneralProductType>[] =
  ALL_CATEGORY_ENTRIES.map(([value, label]) => ({ value, label }));

/** 3) 등록 페이지에서 쓸 옵션 배열: ALL 제외 */
const GENERAL_PRODUCT_CATEGORY_OPTIONS_FOR_CREATE =
  GENERAL_PRODUCT_CATEGORY_OPTIONS.filter(
    (opt): opt is SelectOption<GeneralProductCreateType> => opt.value !== "ALL"
  );

export {
  INITIAL_PRODUCTS_REQUEST,
  ITEM_HEALTH_TYPE_OPTIONS,
  ITEM_HEALTH_TYPE_MAP,
  GENERAL_PRODUCT_CATEGORY_OPTIONS,
  GENERAL_PRODUCT_CATEGORY_MAP,
  GENERAL_PRODUCT_CATEGORY_OPTIONS_FOR_CREATE,
  ITEM_HEALTH_TYPE_KEYS,
};
